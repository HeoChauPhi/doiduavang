<?php
// View list users
//add_shortcode( 'shortcode_name', 'ct_shortcode_function_callback' );
function ct_shortcode_function_callback($attrs) {
  extract(shortcode_atts (array(
  ), $attrs));

  ob_start();

    if (hasfiles(get_template_directory() . "/templates/shortcode/*.twig", 'shortcode_template.twig')) {
      Timber::render('shortcode_template.twig', $context);
    } else {
      echo 'Could not find a twig file for layout type: /templates/shortcode/shortcode_template.twig<br>';
    }

    $content = ob_get_contents();
  ob_end_clean();
  return $content;
  wp_reset_postdata();
}
