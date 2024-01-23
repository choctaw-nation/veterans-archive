<?php
/**
 * Homepage Template
 *
 * @author KJ Roelke
 * @since 1.0
 * @package ChoctawNation
 */

use ChoctawNation\ACF\Image;

get_header();

get_template_part( 'template-parts/section', 'hero' );
?>

<section class="bg-dark-blue container rounded-5 px-5 position-relative" id='search-bar'>
	<div class="row">
		<?php get_template_part( 'template-parts/search', 'search-bar' ); ?>
	</div>
</section>
<section class="container my-5 py-5">
	<?php get_template_part( 'template-parts/content', 'two-col', array( 'acf' => get_field( 'section_1' ) ) ); ?>
</section>
<section class="bg-light-green my-5 py-5">
	<?php
	$section_2 = get_field( 'section_2' );
	$cols      = count( $section_2 );
	?>
	<div class="container">
		<div class="<?php echo "row row-cols-1 row-cols-md-auto row-cols-lg-{$cols}"; ?>">
			<?php while ( have_rows( 'section_2' ) ) : ?>
			<?php the_row(); ?>
			<?php $image = new Image( get_sub_field( 'cover_image' ), 'square-lg' ); ?>
			<div class="col">
				<?php $cta = get_sub_field( 'link' ); ?>
				<a href="<?php echo esc_url( $cta['url'] ); ?>" class='card' target="<?php echo esc_attr( $cta['target'] ); ?>">
					<div class='card-img-top ratio ratio-1x1 mb-3'>
						<?php $image->the_image( 'object-fit-cover' ); ?>
					</div>
					<div class="card-body">
						<?php cno_divider( 'end', 'primary' ); ?>
						<h3 class='text-dark-blue text-uppercase fs-4'>
							<?php echo esc_textarea( $cta['title'] ); ?>
						</h3>
					</div>
				</a>
			</div>

			<?php endwhile; ?>

		</div>

	</div>

</section>
<?php
$additional_sections = get_field( 'two_col_media_content' );
foreach ( $additional_sections as $index => $section ) {
	echo '<section class="container my-5 py-5">';
	get_template_part(
		'template-parts/content',
		'two-col',
		array(
			'acf'      => $section,
			'reversed' => (0 === $index % 2),
		)
	);
	echo '</section>';
}
get_footer();
