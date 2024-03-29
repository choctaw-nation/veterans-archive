<?php
/**
 * Content: Tabs
 * Handles the Display of different tabbed content on a veteran's single page. There is a lot of conditional rendering because no data type is sure to have any value.
 *
 * @package ChoctawNation
 */

use ChoctawNation\Components\Buttons;

wp_enqueue_script( 'bsTab' );
/**
 * The Veteran class
 *
 * @var \ChoctawNation\ACF\Veteran Veteran $veteran */
$veteran   = $args[0];
$nav_items = array(
	array(
		'id'       => 'awards',
		'label'    => 'Awards & Commendations',
		'is_empty' => empty( $veteran->get_the_decorations() ),
		'values'   => $veteran->get_the_decorations(),
	),
	array(
		'id'       => 'training',
		'label'    => 'Advanced Training',
		'is_empty' => empty( $veteran->advanced_training ),
		'values'   => $veteran->advanced_training,
	),
	array(
		'id'       => 'overseas',
		'label'    => 'Overseas Duty',
		'is_empty' => empty( $veteran->overseas_duty ),
		'values'   => $veteran->overseas_duty,
	),
	array(
		'id'       => 'jobs',
		'label'    => 'Jobs',
		'is_empty' => empty( $veteran->jobs ),
		'values'   => $veteran->jobs,
	),
);

?>

<nav role='navigation'>
	<ul class="nav nav-tabs flex-nowrap column-gap-4 overflow-x-scroll overflow-y-hidden align-items-stretch text-center border-0" id="myTab" role="tablist">
		<?php $is_first = true; ?>
		<?php foreach ( $nav_items as $nav_item ) : ?>
			<?php
			if ( $nav_item['is_empty'] ) {
				continue;
			}
			?>
		<li class="nav-item h-auto mb-0 d-flex justify-content-center align-items-stretch" role="presentation">
			<?php
			$buttons = new Buttons();
			$buttons->the_tab_button(
				$nav_item['id'],
				$nav_item['label'],
				$is_first,
			);
			?>
		</li>
			<?php $is_first = false; ?>
		<?php endforeach; ?>
	</ul>
</nav>
<div class="tab-content mt-3" id="myTabContent">
	<?php $is_first = true; ?>
	<?php foreach ( $nav_items as $tab_content ) : ?>
		<?php
		if ( $tab_content['is_empty'] ) {
			continue;
		}
		?>
	<div class="tab-pane fade <?php echo $is_first ? ' show active' : ''; ?>" id="<?php echo "{$tab_content['id']}-tab-pane"; ?>" role="tabpanel" tabindex="0"
		aria-labelledby="<?php echo "{$tab_content['id']}-tab"; ?>">
		<?php $is_first = false; ?>
		<ul class="<?php echo "{$tab_content['id']}-list ms-3"; ?>">
			<?php
			foreach ( $tab_content['values'] as $value ) {
				echo "<li class='{$tab_content['id']}-list__item'>{$value}</li>";
			}
			?>
		</ul>
	</div>
	<?php endforeach; ?>
</div>
