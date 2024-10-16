{ pkgs, ... }: {

  # Which nixpkgs channel to use.
  channel = "stable-23.11";

  # Use https://search.nixos.org/packages to find packages
  packages = [
    pkgs.nodejs_18
    pkgs.rojo
    pkgs.lune
  ];

  env = {
    OPENSSL_DIR = "${pkgs.openssl.dev}";
  };
  idx={
    workspace = {
      onCreate = {
        npm-install = "npm install";
      };
    };

    previews = {
      enable = false;
      previews = [{
        command = ["npm" "run" "start" "--" "--port" "$PORT"];
        manager = "web";
        id = "web";
      }];
    };

    extensions = [
      "evaera.vscode-rojo"
      "Fireboltofdeath.vscode-roblox-ts"
    ];
  };

}