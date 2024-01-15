<?php
/**
 * Handles Search Results
 *
 * @package ChoctawNation
 */

$user_query     = get_search_query();
$search_results = new WP_Query(
	array(
		'post_type'      => 'veteran',
		'posts_per_page' => 100,
		's'              => $user_query,
	)
);
?>
<div class="container my-5 py-5">
	<?php if ( ! empty( $user_query ) ) : ?>
	<div class="row my-5">
		<div class="col">
			<h1>Showing Results for "<?php echo $user_query; ?>"</h1>
		</div>
	</div>
	<?php endif; ?>
	<?php if ( ! $search_results->have_posts() ) : ?>
	<div class="row">
		<div class="col">
			<p class='fw-bold'>No results found.</p>
		</div>
	</div>
	<?php else : ?>
	<div class="row row-cols-auto row-cols-lg-4 row-gap-4">
		<?php while ( $search_results->have_posts() ) : ?>
			<?php $search_results->the_post(); ?>
		<div class="col">
			<?php get_template_part( 'template-parts/veterans/content', 'veteran-preview' ); ?>
		</div>
		<?php endwhile; ?>
	</div>
	<?php endif; ?>
</div>
<?php
wp_reset_postdata();
