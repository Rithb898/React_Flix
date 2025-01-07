import React from "react";
import { Link } from "react-router";

function Footer() {
  return (
    <footer class='text-center py-4 text-white text-sm mt-10'>
      © 2025 <Link to={"/"}>RithFlix</Link> - Your Ultimate Movie Streaming Destination
    </footer>
  );
}

export default Footer;
