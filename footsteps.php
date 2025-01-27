<?php
/*
 * Plugin Name: FOOT STEPS
 * Version: 0.0.1
 * Author: Denis Behrends
 */

if ( ! defined( 'WPINC' ) ) {
    die;
}

add_action( 'wp_enqueue_scripts', 'foot_steps_enqueue_scripts' );
function foot_steps_enqueue_scripts( $hook ) {
    wp_enqueue_script(
        'foot_steps_js',
        plugins_url( '/dist/assets/index.js', __FILE__ ),
        null,
        '1.0.0',
        array(
        'in_footer' => true,
        )
    );
}

add_action( 'wp_enqueue_scripts', 'foot_steps_enqueue_styles' );
function foot_steps_enqueue_styles( $hook ) {
    wp_enqueue_style(
        'foot_steps_css',
        plugins_url( '/dist/assets/index.css', __FILE__ )
    );
}