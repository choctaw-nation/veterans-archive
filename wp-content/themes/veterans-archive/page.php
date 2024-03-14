<?php
/**
 * Standard Page Output with default Hero section
 *
 * @package ChoctawNation
 */

get_header( 'search' );
?>
<main class='site-content <?php echo $post->post_name; ?>'>
	<article class="container py-5">
		<?php echo get_field( 'page_content' ); ?>
	</article>
</main>
<?php
get_footer();
