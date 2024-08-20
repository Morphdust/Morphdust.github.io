import os
import glob

def rename_images(root_dir, extensions=['*.jpg', '*.png', '*.jpeg']):
    for dirpath, dirnames, filenames in os.walk(root_dir):
        images = []
        for extension in extensions:
            images.extend(glob.glob(os.path.join(dirpath, extension)))
        for i, image_path in enumerate(images, start=1):
            dir_name = os.path.basename(dirpath)
            new_name = f"{dir_name}_{i}{os.path.splitext(image_path)[1]}"
            new_path = os.path.join(dirpath, new_name)
            os.rename(image_path, new_path)

# Call the function with the directory path
rename_images('./')
