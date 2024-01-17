<?php
/**
 * Standard Page Output with default Hero section
 *
 * @package ChoctawNation
 */

get_header();
?>
<main class='site-content <?php echo $post->post_name; ?>'>
	<?php get_template_part( 'template-parts/section', 'hero' ); ?>
	<article class="container py-5">
		<?php the_content(); ?>
	</article>

</main>
<?php
get_footer();