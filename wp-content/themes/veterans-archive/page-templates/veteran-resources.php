<?php
/**
 * Template Name: Veteran Resources
 *
 * @package ChoctawNation
 */

use ChoctawNation\Components\Buttons;

get_header( 'search' );
$resource_links = get_field( 'resource_links' );
$buttons        = new Buttons();
?>
<main class='site-content <?php echo $post->post_name; ?>'>
	<article class="container py-5">
		<?php the_title( '<h1>', '</h1>' ); ?>
		<?php if ( $resource_links ) : ?>
		<div class="row row-cols-auto row-cols-md-2 row-cols-xl-3 align-items-stretch row-gap-4 my-3">
			<?php
			while ( have_rows( 'resource_links' ) ) :
				the_row();
				?>
			<div class="col">
				<div class="card h-100 p-4">
					<div class="card-body p-0 mb-4">
						<h2 class="card-title display-2 fs-2 text-uppercase text-dark-blue"><?php the_sub_field( 'link_title' ); ?></h2>
						<p><?php the_sub_field( 'link_description' ); ?></p>
					</div>
					<div class="row g-0 mt-auto">
						<div class="col-auto">
							<?php
							$buttons->the_button(
								array(
									'element' => 'a',
									'class'   => 'btn-outline-primary align-self-end',
									'href'    => esc_url( get_sub_field( 'link' ) ),
									'target'  => '_blank',
									'text'    => 'View Resource',
								)
							);
							?>
						</div>
					</div>
				</div>
			</div>
			<?php endwhile; ?>
		</div>
		<?php endif; ?>
	</article>
</main>
<?php
get_footer();