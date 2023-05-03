<?php
/**
 * Plugin Name: My Custom Block
 */

function full_custom_block_script_register() {
  register_block_type(__DIR__ . '/build');
}

add_action('init','full_custom_block_script_register')
?>
