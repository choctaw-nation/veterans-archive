<?php
/**
 * Basic Footer Template
 *
 * @since 1.0
 * @package ChoctawNation
 */

?>

<footer class="footer container-fluid">
	<div class="row">
		<div class="col-auto flex-grow-1 col-sm-6 col-lg-4 bg-green py-5">
			<a href="<?php echo esc_url( site_url() ); ?>" class="fs-3 text-uppercase" aria-label="to Home Page">
				Choctaw Nation <br /> Veterans Archive
			</a>
		</div>
		<div class="col-2 footer-split d-none d-lg-block"></div>
		<div class="col-auto flex-grow-1 col-sm-6 bg-primary py-5 text-sm-end">
			<div class="social-icons">
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
				<a href="<?php echo $social['href']; ?>" class="social ms-2" target="_blank" rel="noopener noreferrer" aria-label="<?php echo $social['aria-label']; ?>">
					<i class="<?php echo "text-white fa-2xl {$social['icon_class']}"; ?>"></i>
				</a>
				<?php endforeach; ?>
			</div>
			<div class="row mt-3 w-75 justify-content-end ms-auto">
				<div id="copyright" class="text-white">
					<?php echo '&copy;&nbsp;' . gmdate( 'Y' ) . '&nbsp;Choctaw Nation of Oklahoma. All Rights Reserved.'; ?>
				</div>
			</div>
		</div>
	</div>
</footer>
<?php wp_footer(); ?>
</body>

</html>
