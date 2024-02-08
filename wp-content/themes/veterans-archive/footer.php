<?php
/**
 * Basic Footer Template
 *
 * @since 1.0
 * @package ChoctawNation
 */

$footer_col_classes = 'col-auto flex-grow-1 py-5 col-sm-6 d-flex flex-column justify-content-center align-items-center';
?>

<footer class="footer container-fluid">
	<div class="row">
		<div class="<?php echo $footer_col_classes; ?> col-lg-4 bg-green">
			<a href="<?php echo esc_url( site_url() ); ?>" class="fs-3 text-uppercase text-dark" aria-label="to Home Page">
				Choctaw Nation <br /> Veterans Archive
			</a>
		</div>
		<div class="col-2 footer-split d-none d-lg-block"></div>
		<div class="<?php echo $footer_col_classes; ?> pe-5 bg-primary text-sm-end align-items-sm-end">
			<div class="social-icons me-5">
				<?php
				$socials = array(
					array(
						'icon_class' => 'fa-brands fa-x-twitter',
						'href'       => 'https://twitter.com/',
						'aria-label' => 'Follow Us on X (Twitter)',
					),
					array(
						'icon_class' => 'fa-brands fa-facebook-f',
						'href'       => 'https://facebook.com/',
						'aria-label' => 'Follow Us on Facebook',
					),
					array(
						'icon_class' => 'fa-brands fa-instagram',
						'href'       => 'https://instagram.com',
						'aria-label' => 'Follow Us on Instagram',
					),
				);
				?>
				<?php foreach ( $socials as $social ) : ?>
				<a href="<?php echo $social['href']; ?>" class="social mx-2" target="_blank" rel="noopener noreferrer" aria-label="<?php echo $social['aria-label']; ?>">
					<i class="<?php echo "text-dark fa-2xl {$social['icon_class']}"; ?>"></i>
				</a>
				<?php endforeach; ?>
			</div>
			<div id="copyright" class="mt-3 me-5 w-75 text-dark">
				<?php echo '&copy;&nbsp;' . gmdate( 'Y' ) . '&nbsp;Choctaw Nation of Oklahoma. All Rights Reserved.'; ?>
			</div>
		</div>
	</div>
</footer>
<?php wp_footer(); ?>
</body>

</html>