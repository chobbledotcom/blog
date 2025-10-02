{
  inputs.nixpkgs.url = "nixpkgs";

  outputs =
    { nixpkgs, ... }:
    let
      forAllSystems = nixpkgs.lib.genAttrs [ "x86_64-linux" ];
    in
    {
      devShells = forAllSystems (
        system:
        let
          pkgs = import nixpkgs { inherit system; };
        in
        {
          default = pkgs.mkShell {
            packages = with pkgs; [ nodejs_24 ];

            shellHook = ''
              [ ! -d node_modules ] && npm install

              cat <<EOF

              Development environment ready!

              Available commands:
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