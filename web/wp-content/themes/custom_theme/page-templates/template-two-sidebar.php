<?php
/**
 * Template Name: Two Sidebar
 *
 * @package WordPress
 * @subpackage FFW
 * @since FFW 1.0
 */

$context = Timber::get_context();
$post = new TimberPost();

$protected = post_password_required($post->ID);
$context['protected_label'] = 'pwbox-'.( empty( $post->ID ) ? rand() : $post->ID );

$context['post'] = $post;
$context['title_option'] = framework_page('title');
$context['rm_social'] = framework_page('rm-social');

if ( !empty(framework_page('rm-background')) ) {
  $context['rm_background'] = 'main-transparent';
}

if ($protected) {
  Timber::render( 'single-protected.twig', $context );
} else {
  Timber::render( 'template-two-sidebar.twig', $context );
}
