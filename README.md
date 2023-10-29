<img src="resources/images/ig-posts-view.png" alt="Instagram Viewed Posts Manager" align="left" width="232" height="249" style="margin-right: 5px">

# Instagram Viewed Posts Manager

A tool to manage and highlight viewed posts on Instagram.

## Overview

Instagram Viewed Posts Manager is a utility designed to help users keep track of the Instagram posts they have viewed.
This tool dynamically adds a "Viewed" button to each Instagram post, enabling users to manually mark posts as viewed.
Furthermore, viewed posts are visually modified for easier identification.

## Features

- Detects new Instagram posts on the page dynamically.
- Allows manual marking of viewed posts.
- Visually distinguishes viewed posts from non-viewed ones.

## Installation

To add the Instagram Viewed Posts Manager extension to your Chrome browser, follow these simple steps:

1. **Download the repository:**
    - Clone the repository using the following command in your terminal:
   ```
   git clone https://github.com/pauloeli/ig-viewed-posts.git
   ```

2. **Install npm dependencies:**
    - Navigate to the extension's directory using the terminal:
   ```
   cd ig-viewed-posts
   ```
    - Install the necessary dependencies by running the following command:
   ```
   npm install
   ```

3. **Load the extension in Chrome:**
    - Open Google Chrome and go to `chrome://extensions/`.
    - Enable the "Developer mode" toggle in the top right corner of the page.
    - Click the "Load unpacked" button, and select the `dist` directory from the extension's folder (created after
      running `npm run build`).

Now, the Instagram Viewed Posts Manager extension is successfully installed in your Chrome browser!

## Usage

Once you've installed the extension, you can start using it right away:

- Navigate to an Instagram page.
- The script will automatically detect all the posts and add the "Viewed" button to each one.
- Click the "Viewed" button on any post to toggle its viewed status. The post will visually update to reflect the
  change.

## Developer Disclaimer

Please note that the developer of this script is not responsible for any misuse of this tool. This script is intended
for educational and personal use only. When using this script, be sure to respect Instagram's terms of service and the
privacy of other users. Use it responsibly and at your own risk.

## License

This project is licensed under the [MIT License](LICENSE).