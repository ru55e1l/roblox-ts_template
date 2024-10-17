import os
import re
import subprocess
import sys

# Hardcoded GitHub repository URL
GITHUB_REPO_URL = 'https://github.com/ru55e1l/roblox-ts_template.git'

def clone_repo(repo_url, destination_folder):
    """Clones the GitHub repository to the specified folder."""
    try:
        print(f"Cloning repository from {repo_url} to {destination_folder}")
        subprocess.run(['git', 'clone', repo_url, destination_folder], check=True)
    except subprocess.CalledProcessError as e:
        print(f"Error cloning repository: {e}")
        sys.exit(1)

def replace_in_file(file_path, old_value, new_value):
    """Replaces occurrences of old_value with new_value in a file."""
    try:
        with open(file_path, 'r', encoding='utf-8') as file:
            content = file.read()

        # Replace according to case rules
        updated_content = re.sub(
            old_value,
            lambda match: new_value.lower() if match.group(0).islower() else new_value,
            content
        )

        with open(file_path, 'w', encoding='utf-8') as file:
            file.write(updated_content)

    except Exception as e:
        print(f"Error replacing text in {file_path}: {e}")

def replace_in_directory(directory_path, old_value, new_value):
    """Recursively replaces occurrences of old_value in all files and folders under a directory."""
    for root, dirs, files in os.walk(directory_path, topdown=False):
        # Replace in file contents
        for file in files:
            file_path = os.path.join(root, file)
            replace_in_file(file_path, old_value, new_value)

        # Replace in folder names
        for dir_name in dirs:
            dir_path = os.path.join(root, dir_name)
            if old_value in dir_name:
                # Replace "hyperdrive" with new project name, considering case
                new_dir_name = dir_name.replace(old_value, new_value.lower() if old_value.islower() else new_value)
                new_dir_path = os.path.join(root, new_dir_name)
                try:
                    print(f"Renaming folder {dir_path} to {new_dir_path}")
                    os.rename(dir_path, new_dir_path)
                except Exception as e:
                    print(f"Error renaming folder {dir_path}: {e}")

def main():
    if len(sys.argv) < 3:
        print("Usage: python script.py <folder_path> <project_name>")
        sys.exit(1)

    folder_path = sys.argv[1]
    project_name = sys.argv[2]

    # Ensure the destination folder exists
    if not os.path.exists(folder_path):
        os.makedirs(folder_path)

    # Clone the repository to the specified folder
    clone_repo(GITHUB_REPO_URL, folder_path)

    # Replace all occurrences of "hyperdrive" with the project name in files and folder names
    print(f"Replacing 'hyperdrive' with '{project_name}' in {folder_path}")
    replace_in_directory(folder_path, "hyperdrive", project_name)

if __name__ == "__main__":
    main()
