<?php
/**
 * Homepage Template
 *
 * @author KJ Roelke
 * @since 1.0
 * @package ChoctawNation
 */

use ChoctawNation\ACF\Image;
use ChoctawNation\Components\Divider;

$divider = new Divider();
get_header();
get_template_part( 'template-parts/section', 'hero' );
?>

<section class="bg-dark-blue container rounded-5 px-5 position-relative" id='search-bar'>
	<div class="row">
		<?php
		get_template_part(
			'template-parts/search',
			'search-bar',
			array(
				'bg_color'     => 'dark-blue',
				'with_browse'  => true,
				'with_filters' => false,
			)
		);
		?>
	</div>
</section>
<section class="container my-5 py-5">
	<?php
	get_template_part(
		'template-parts/content',
		'two-col',
		array( 'acf' => get_field( 'section_1' ) )
	);
	?>
</section>
<section class="bg-light-green my-5 py-5">
	<?php
	$section_2 = get_field( 'section_2' );
	$cols      = count( $section_2 );
	?>
	<div class="container">
		<div class="<?php echo "row row-cols-1 row-cols-md-2 row-cols-lg-{$cols} align-items-stretch row-gap-4"; ?>">
			<?php while ( have_rows( 'section_2' ) ) : ?>
			<?php the_row(); ?>
			<?php $image = new Image( get_sub_field( 'cover_image' ), 'square-lg' ); ?>
			<div class="col d-flex flex-column">
				<?php $cta = get_sub_field( 'link' ); ?>
				<a href="<?php echo esc_url( $cta['url'] ); ?>" class='bg-white h-100' target="<?php echo esc_attr( $cta['target'] ); ?>" title='<?php echo $cta['title']; ?>'>
					<div class=' ratio ratio-1x1 mb-3 '>
						<?php $image->the_image( 'object-fit-cover' ); ?>
					</div>
					<div class="mt-auto p-3">
						<?php $divider->the_divider( 'end', 'primary' ); ?>
						<h3 class=' text-dark-blue text-uppercase fs-4'>
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
			'reversed' => ( 0 === $index % 2 ),
		)
	);
	echo '</section>';
}
get_footer();
