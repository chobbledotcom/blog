---
title: Hardening NixOS
description: Hardening my NixOS server
date: 2024-11-27
tags: nixos
---

Today I got stuck into locking my new NixOS server down - if I'm going to host site for customers it needs to be extra secure, and I need to be notified if something breaks.

I used [this](https://xeiaso.net/blog/paranoid-nixos-2021-07-18/) great guide by Xe for inspiration.

Changes I made were:

- Adding Tailscale SSH (achieved with `tailscale up --ssh`) and fiddling around with my access rules
- Locking non-Tailscale SSH down to my home IP address
- Securing SSH in general - disabling things I don't use
- Sending notifications via NTFY whenever certain systemd services fails

Here's the Chobble server configuration as it stands, with secrets redacted:

-----

# settings.nix

```
# This is a NixOS configuration file for a server that runs:
# - Forgejo (git hosting)
# - Caddy (reverse proxy)
# - Service monitoring with failure notifications
# - Multiple static websites
{
  config,
  lib,
  pkgs,
  ...
}: let
  # SERVICE MONITORING CONFIGURATION

  # These core services will always be monitored for failures
  baseServices = [
    # Git hosting service
    "forgejo"
    # Web server/reverse proxy
    "caddy"
    # Test service that always fails (for monitoring testing)
    "always-fails"
  ];

  # Get list of site builder services from the site-builder configuration.
  # Only included if site-builder is enabled.
  # Converts domains like "example.com" into service names like
  # "example-com-builder"
  siteBuilderServices = lib.optionals
    config.services.site-builder.enable
    (map
      (domain: "${lib.replaceStrings ["."] ["-"] domain}-builder")
      (builtins.attrNames config.services.site-builder.sites)
    );

  # Complete list of all services that should be monitored
  monitoredServices = baseServices ++ siteBuilderServices;

  # Creates a monitoring configuration for a single service
  # Input: service name (like "forgejo")
  # Output: configuration that adds failure monitoring to that service
  monitorConfig = name: lib.nameValuePair
    name
    {
      unitConfig.OnFailure = [
        # %n is replaced with the service name by systemd
        "notify-failure@%n"
      ];
    };

  # Convert our list of services into a systemd-compatible attribute set
  # This adds failure monitoring to each service in monitoredServices
  monitoringConfigs = builtins.listToAttrs (map monitorConfig monitoredServices);

in {
  # Import common configuration shared across all machines
   imports = [
     ../../base.nix
   ];

   # BOOT CONFIGURATION

   boot.loader.grub = {
     enable = true;
     device = "/dev/xvda";
     efiSupport = false;
   };

   # FIREWALL CONFIGURATION

   networking.firewall = {
     enable = true;

     # Open ports for web traffic
     allowedTCPPorts = [
       80 # HTTP
       443 # HTTPS
     ];

     # Custom iptables rules to restrict SSH access to specific IP
     extraCommands = ''
       # First, block all SSH connections by default
       iptables -A INPUT -p tcp --dport 22 -j DROP

       # Then, allow SSH only from this specific IP address
       iptables -I INPUT \
         -p tcp \
         --dport 22 \
         -s HOME_IP/32 \
         -j ACCEPT
     '';

     # Remove our custom rules when the firewall stops
     # The '|| true' ensures the script doesn't fail if rules don't exist
     extraStopCommands = ''
       iptables -D INPUT -p tcp --dport 22 -j DROP || true
       iptables -D INPUT \
         -p tcp \
         --dport 22 \
         -s HOME_IP/32 \
         -j ACCEPT || true
     '';
   };

  # Caddy web server configuration
  services.caddy = {
    enable = true;
    virtualHosts = {
      # Configuration for git.chobble.com
      "git.chobble.com" = {
        # Listen on all interfaces
        listenAddresses = ["0.0.0.0"];

        # Reverse proxy configuration for Forgejo
        extraConfig = ''
          reverse_proxy :3000 {
            header_up Host 127.0.0.1
          }
        '';
      };
    };
  };

  # Forgejo (git hosting) configuration
  services.forgejo = {
    enable = true;
    settings = {
      ui = {
        DEFAULT_THEME = "forgejo-dark";
      };

      server = {
        DOMAIN = "git.chobble.com";
        ROOT_URL = "https://git.chobble.com/";
        LANDING_PAGE = "/chobble";
        HTTP_PORT = 3000;
      };

      # Prevent new user registrations
      service.DISABLE_REGISTRATION = true;

      # Disable Forgejo Actions
      actions.ENABLED = false;
    };
  };

  # Systemd services configuration
  systemd.services = lib.mkMerge [
    {
      # Template service for failure notifications
      "notify-failure@" = {
        enable = true;
        description = "Failure notification for %i";
        scriptArgs = "%i";  # Pass the service name as an argument
        # Send notification via ntfy.sh when a service fails
        script = ''${pkgs.curl}/bin/curl \
          --fail \
          --show-error --silent \
          --max-time 10 \
          --retry 3 \
          --data "${config.networking.hostName} service '$1' exited with errors" \
          https://ntfy.sh/MY_NTFY_CHANNEL'';
      };

      # Test service that always fails (for testing)
      always-fails = {
        description = "Always fails";
        script = "exit 1";
        serviceConfig.Type = "oneshot";
      };
    }

    # Merge in the failure monitoring configurations
    monitoringConfigs
  ];

  # SSH server configuration
  services.openssh = {
    enable = true;
    allowSFTP = false;
    settings = {
      PermitRootLogin = "no";
      PasswordAuthentication = false;
    };
    extraConfig = ''
      AllowTcpForwarding yes
      X11Forwarding no
      AllowAgentForwarding no
      AllowStreamLocalForwarding no
      AuthenticationMethods publickey
    '';
  };

  # Remove default packages
  environment.defaultPackages = [];

  # Set home directory permissions
  users.users.user.homeMode = "0777";

  system.stateVersion = "23.05";
}
```

-----

## flake.nix

And here's my `flake.nix` which includes the above file in `/host/chobble/settings.nix`

```
{
  description = "Machine Flakes";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-24.11";
    nixpkgs-unstable.url = "github:NixOS/nixpkgs/nixos-unstable";
    home-manager = {
      url = "github:nix-community/home-manager/release-24.11";
      inputs.nixpkgs.follows = "nixpkgs";
    };
    nix-flatpak.url = "github:gmodena/nix-flatpak";
    nixos-hardware.url = "github:nixos/nixos-hardware";
    fw-fanctrl = {
      url = "github:TamtamHero/fw-fanctrl/packaging/nix";
      inputs.nixpkgs.follows = "nixpkgs";
    };
    site-builder = {
      url = "git+https://git.chobble.com/chobble/nixos-site-builder";
      inputs.nixpkgs.follows = "nixpkgs";
    };
  };

  outputs = inputs@{
    self,
    nixpkgs,
    nixpkgs-unstable,
    home-manager,
    nix-flatpak,
    nixos-hardware,
    fw-fanctrl,
    site-builder,
    ...
  }:
    let
      system = "x86_64-linux";

      overlay-unstable = final: prev: {
        unstable = import nixpkgs-unstable {
          inherit system;
          config.allowUnfree = true;
        };
      };

      mkHost = {
        hostname,
        extraModules ? []
      }: nixpkgs.lib.nixosSystem {
        inherit system;
        specialArgs = { inherit inputs; };
        modules = [
          "${nixpkgs}/nixos/modules/installer/scan/not-detected.nix"

          # Add the overlay to make unstable packages available
          { nixpkgs.overlays = [ overlay-unstable ]; }

          home-manager.nixosModules.home-manager

          ./hosts/${hostname}/hardware.nix
          ./hosts/${hostname}/settings.nix

          {
            home-manager = {
              useGlobalPkgs = true;
              useUserPackages = true;
            };
            networking.hostName = hostname;
          }
        ] ++ extraModules;
      };
    in
    {
      nixosConfigurations = {
        stef = mkHost {
          hostname = "stef";
          extraModules = [
            nix-flatpak.nixosModules.nix-flatpak
            nixos-hardware.nixosModules.common-gpu-amd
          ];
        };
        framework = mkHost {
          hostname = "framework";
          extraModules = [
            fw-fanctrl.nixosModules.default
            nix-flatpak.nixosModules.nix-flatpak
            nixos-hardware.nixosModules.framework-13-7040-amd
          ];
        };
        latitude = mkHost {
          hostname = "latitude";
          extraModules = [
            nix-flatpak.nixosModules.nix-flatpak
            nixos-hardware.nixosModules.dell-latitude-7280
          ];
        };
        nuc = mkHost {
          hostname = "nuc";
          extraModules = [
            nix-flatpak.nixosModules.nix-flatpak
          ];
        };
        chobble = mkHost {
          hostname = "chobble";
          extraModules = [
            ({ config, ... }: {
              imports = [ site-builder.nixosModules.default ];
              services.site-builder = {
                enable = true;
                sites = {
                  "chobble.com" = {
                    gitRepo = "http://localhost:3000/chobble/chobble";
                    wwwRedirect = true;
                  };
                  "veganprestwich.co.uk" = {
                    gitRepo = "http://localhost:3000/chobble/vegan-prestwich";
                    wwwRedirect = true;
                  };
                  "blog.chobble.com" = {
                    gitRepo = "http://localhost:3000/chobble/blog";
                    wwwRedirect = false;
                  };
                };
              };
            })
          ];
        };
      };
    };
}
```

-----

I was tempted to tidy the `flake.nix` file up to just the most relevent bits but I think it's probably handier to see how the Chobble server fits alongside my other machines.

Long term I want to add this all to a publicly viewable Git repository like everything else, but before I do that I need to strip out any secrets and start using a secret manager. So that's probably next!
