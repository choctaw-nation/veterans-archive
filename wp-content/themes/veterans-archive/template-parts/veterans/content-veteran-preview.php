<?php
/**
 * Content: Veteran Preview
 * Used in Search Results/Archive Pages
 *
 * @package ChoctawNation
 */

?>
<div class="card shadow h-100">
	<?php
		the_post_thumbnail(
			'medium',
			array(
				'loading' => 'lazy',
				'class'   => 'w-100 card-img-top object-fit-cover',
				'style'   => 'max-height:15rem',
			)
		);
		?>
	<div class="card-body d-flex flex-column">
		<span class="card-title h4">
			<?php the_title(); ?>
		</span>
		<div class="card-text-py-2 mb-2">
			<div class="at-a-glance"></div>
		</div>
		<a href='<?php the_permalink(); ?>' class="btn btn-outline-primary mt-auto align-self-start">Read More</a>
	</div>
</div>