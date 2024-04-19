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
			<?php // get_template_part( 'template-parts/footer', 'socials' ); ?>
			<div id="copyright" class="mt-3 me-5 w-75 text-dark">
				<?php echo '&copy;&nbsp;' . gmdate( 'Y' ) . '&nbsp;Choctaw Nation of Oklahoma. All Rights Reserved.'; ?>
			</div>
		</div>
	</div>
</footer>
<?php wp_footer(); ?>
</body>

</html>
