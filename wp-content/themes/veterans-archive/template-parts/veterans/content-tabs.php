<?php
/**
 * Content: Tabs
 * Handles the Display of different tabbed content on a veteran's single page. There is a lot of conditional rendering because no data type is sure to have any value.
 *
 * @package ChoctawNation
 */

wp_enqueue_script( 'bsTab' );
$veteran           = $args[0];
$awards            = $veteran->get_the_decorations();
$advanced_training = $veteran->advanced_training;
$overseas_duty     = $veteran->overseas_duty;
$jobs              = $veteran->jobs;
$nav_items         = array(
	array(
		'id'       => 'awards',
		'label'    => 'Awards & Commendations',
		'is_empty' => empty( $awards ),
		'values'   => $awards,
	),
	array(
		'id'       => 'training',
		'label'    => 'Advanced Training',
		'is_empty' => empty( $advanced_training ),
		'values'   => $advanced_training,
	),
	array(
		'id'       => 'overseas',
		'label'    => 'Overseas Duty',
		'is_empty' => empty( $overseas_duty ),
		'values'   => $overseas_duty,
	),
	array(
		'id'       => 'jobs',
		'label'    => 'Jobs',
		'is_empty' => empty( $jobs ),
		'values'   => $jobs,
	),
);

?>
<ul class="nav nav-tabs flex-nowrap overflow-x-scroll overflow-y-hidden align-items-center text-center" id="myTab" role="tablist">
	<?php $is_first = true; ?>
	<?php foreach ( $nav_items as $nav_item ) : ?>
		<?php
		if ( $nav_item['is_empty'] ) {
			continue;
		}
		?>
	<li class="nav-item" role="presentation">
		<button class="nav-link <?php echo $is_first ? 'active' : ''; ?>" id="<?php echo "{$nav_item['id']}-tab"; ?>" data-bs-toggle="tab"
				data-bs-target="<?php echo "#{$nav_item['id']}-tab-pane"; ?>" type="button" role="tab" aria-controls="<?php echo "{$nav_item['id']}-tab-pane"; ?>" aria-selected="false">
			<?php echo $nav_item['label']; ?>
		</button>
	</li>
		<?php $is_first = false; ?>
	<?php endforeach; ?>
</ul>
<div class="tab-content" id="myTabContent">
	<?php $is_first = true; ?>
	<?php foreach ( $nav_items as $tab_content ) : ?>
		<?php
		if ( $tab_content['is_empty'] ) {
			continue;
		}
		?>
	<div class="tab-pane fade <?php echo $is_first ? ' show active' : ''; ?>" id="<?php echo "{$tab_content['id']}-tab-pane"; ?>" role="tabpanel"
		aria-labelledby="<?php echo "{$tab_content['id']}-tab"; ?>" tabindex="0">
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
