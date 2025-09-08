{
  inputs = {
    nixpkgs.url = "nixpkgs";
  };

  outputs =
    { self, nixpkgs }:
    let
      systems = [ "x86_64-linux" "aarch64-linux" "x86_64-darwin" "aarch64-darwin" ];
      forAllSystems = nixpkgs.lib.genAttrs systems;

      makeEnvForSystem =
        system:
        let
          pkgs = import nixpkgs { system = system; };

          devDependencies = with pkgs; [
            nodejs_23
          ];
        in
        {
          inherit pkgs;
          devEnv = {
            inherit pkgs;
            dependencies = devDependencies;
          };
        };
    in
    {
      devShells = forAllSystems (
        system:
        let
          env = makeEnvForSystem system;
          inherit (env.devEnv)
            pkgs
            dependencies
            ;
        in
        {
          default = pkgs.mkShell {
            buildInputs = dependencies;

            shellHook = ''
              cat <<EOF

              Development environment ready!

              Available commands:
               - 'npm install'     # Install dependencies
               - 'npm run serve'   # Start development server
               - 'npm run build'   # Build the site in the _site directory
               - 'npm run dev'     # Start development server (alias for serve)
               - 'npm run clean'   # Clean the _site directory

              EOF

              git pull
            '';
          };
        }
      );
    };
}