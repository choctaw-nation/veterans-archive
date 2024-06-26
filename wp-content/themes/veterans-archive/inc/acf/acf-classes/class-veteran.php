<?php
/**
 * Class: Veteran
 * Class to build markup based on ACF data
 *
 * @package ChoctawNation
 * @subpackage ACF
 */

namespace ChoctawNation\ACF;

/**
 * Creates WP-like API to generate markup
 */
class Veteran extends Veteran_Setter {
	/**
	 * The post ID
	 *
	 * @var int
	 */
	public int $post_id;

	/**
	 * The constructor
	 *
	 * @param int   $post_id The post ID
	 * @param array $acf_fields The ACF fields
	 */
	public function __construct( $post_id, $acf_fields ) {
		$this->post_id = $post_id;
		$this->init_props( $acf_fields );
	}

	/**
	 * Returns the gender
	 *
	 * @return string
	 */
	public function get_the_gender(): string {
		return $this->gender;
	}

	/**
	 * Echoes the gender
	 *
	 * @return void
	 */
	public function the_gender(): void {
		echo $this->get_the_gender();
	}

	/**
	 * Returns the Veteran's maiden name
	 *
	 * @return ?string
	 */
	public function get_the_maiden_name(): ?string {
		if ( ! $this->maiden_name ) {
			return null;
		}
		return trim( $this->maiden_name );
	}

	/**
	 * Echoes the Veteran's maiden name
	 *
	 * @return void
	 */
	public function the_maiden_name(): void {
		echo $this->get_the_maiden_name();
	}

	/**
	 * Get the Veteran's full name
	 *
	 * @param bool $with_nickname display nickname
	 * @param bool $with_maiden_name display maiden name
	 * @param bool $with_suffix display suffix
	 */
	public function get_the_full_name( $with_nickname = false, $with_maiden_name = false, $with_suffix = false ): string {
		$post_title = get_the_title( $this->post_id );
		$name       = explode( ' ', $post_title );
		$first_name = $name[0];
		$last_name  = $name[1];
		$full_name  = "{$first_name}";
		if ( $with_nickname && ! empty( $this->nickname ) ) {
			$full_name .= ' "' . $this->nickname . '"';
		}
		$full_name .= " {$this->middle_name}";
		if ( $with_maiden_name && ! empty( $this->maiden_name ) ) {
			$full_name .= " ({$this->maiden_name})";
		}
		$full_name .= " {$last_name}";
		if ( $with_suffix && ! empty( $this->suffix ) ) {
			$full_name .= " {$this->suffix}";
		}
		return $full_name;
	}

	/**
	 * Echoes the Veteran's full name
	 *
	 * @param bool $with_nickname display nickname
	 * @param bool $with_maiden_name display maiden name
	 * @param bool $with_suffix display suffix
	 */
	public function the_full_name( $with_nickname = false, $with_maiden_name = false, $with_suffix = false ) {
		echo $this->get_the_full_name( $with_nickname, $with_maiden_name, $with_suffix );
	}

	/**
	 * Get the Veteran's birth date (year only)
	 *
	 * @return ?int
	 */
	public function get_the_birth_date(): ?int {
		return $this->birth ?: null; //phpcs:ignore
	}

	/**
	 * Echoes the Veteran's birth date (year only)
	 *
	 * @return void
	 */
	public function the_birth_date(): void {
		echo $this->get_the_birth_date();
	}

	/**
	 * Get the Veteran's death date (year only)
	 */
	public function get_the_death_date(): ?int {
			return $this->death ?: null; // phpcs:ignore
	}

	/**
	 * Echoes the Veteran's death date (year only)
	 *
	 * @return void
	 */
	public function the_death_date(): void {
		echo $this->get_the_death_date();
	}

	/**
	 * Get the Veteran's home town(s)
	 *
	 * @return ?string
	 */
	public function get_the_hometown(): ?string {
		if ( ! $this->home_areas ) {
			return null;
		} else {
			$home = array();
			foreach ( $this->home_areas as $home_area ) {
				$location = array();
				if ( $home_area->city ) {
					$location[] = trim( $home_area->city );
				}
				if ( $home_area->county ) {
					$location[] = trim( $home_area->county );
				}
				$location[] = $home_area->state;
				$home[]     = join( ', ', $location );
			}
			return implode( '; ', $home );
		}
	}

	/**
	 * Echoes the Veteran's home town(s)
	 *
	 * @return void
	 */
	public function the_hometown(): void {
		echo $this->get_the_hometown();
	}

	/**
	 * Returns the Veteran's military branch(es) as a string, e.g. "<b>Branches of Service:</b> Army, Navy, Air Force"
	 *
	 * @return ?string
	 */
	public function get_the_service_branches(): ?string {
		if ( ! $this->branches_of_service ) {
			return null;
		}

		$branches = array();
		foreach ( $this->branches_of_service as $branch ) {
			$branches[] = $branch->name;
		}

		return implode( ', ', $branches );
	}

	/**
	 * Echoes the Veteran's military branch(es) as a string, e.g. "<b>Branches of Service:</b> Army, Navy, Air Force"
	 *
	 * @return void
	 */
	public function the_service_branches(): void {
		echo $this->get_the_service_branches();
	}

	/**
	 * Get the Veteran's dates of service
	 */
	public function get_the_service_dates(): ?string {
		if ( ! $this->dates_of_service ) {
			return null;
		}
		$dates = array();
		foreach ( $this->dates_of_service as $date ) {
			if ( $date->service_start === $date->service_end ) {
				$dates[] = $date->service_start;
			} elseif ( $date->service_start && empty( $date->service_end ) ) {
				$dates[] = $date->service_start;
			} else {
				$dates[] = $date->service_start . ' &ndash; ' . $date->service_end;
			}
		}
		return implode( ', ', $dates );
	}

	/**
	 * Echoes the Veteran's dates of service
	 *
	 * @return void
	 */
	public function the_service_dates(): void {
		echo $this->get_the_service_dates();
	}

	/**
	 * Get the Veteran's wars
	 *
	 * @return ?string
	 */
	public function get_the_wars(): ?string {
		$wars = array();
		if ( ! $this->wars || ! is_array( $this->wars ) || empty( $this->wars ) ) {
			return null;
		}
		foreach ( $this->wars as $war ) {
			$wars[] = $war->name;
		}
		return implode( ', ', $wars );
	}

	/**
	 * Echoes the Veteran's wars as a string
	 *
	 * @return void
	 */
	public function the_wars(): void {
		echo $this->get_the_wars();
	}

	/**
	 * Get the Veteran's decorations
	 *
	 * @return ?array
	 */
	public function get_the_decorations(): ?array {
		if ( ! $this->decorations ) {
			return null;
		}

		$decorations_array = array();

		if ( $this->decorations->decorations ) {
			foreach ( $this->decorations->decorations as $decoration ) {
				$decorations_array[] = $decoration->name;
			}
		}

		if ( $this->decorations->additional_decorations ) {
			foreach ( $this->decorations->additional_decorations as $additional_decoration ) {
				$decorations_array[] = $additional_decoration;
			}
		}

		return $decorations_array;
	}

	/**
	 * Echoes the Veteran's decorations
	 *
	 * @return void
	 */
	public function the_decorations(): void {
		echo $this->get_the_decorations();
	}

	/**
	 * Get the Veteran's overseas duty
	 *
	 * @return ?string
	 */
	public function get_the_overseas_duty(): ?string {
		return join( ', ', $this->overseas_duty );
	}

	/**
	 * Echoes the Veteran's overseas duty
	 *
	 * @return void
	 */
	public function the_overseas_duty(): void {
		echo $this->get_the_overseas_duty();
	}

	/**
	 * Get the Veteran's stateside assignments
	 *
	 * @return ?string
	 */
	public function get_the_stateside_assignments(): ?string {
		return join( ', ', $this->stateside_assignments );
	}

	/**
	 * Echoes the Veteran's stateside assignments
	 *
	 * @return void
	 */
	public function the_stateside_assignments(): void {
		echo $this->get_the_stateside_assignments();
	}

	/**
	 * Get the Veteran's jobs
	 *
	 * @return ?string
	 */
	public function get_the_jobs(): ?string {
		return join( ', ', $this->jobs );
	}

	/**
	 * Echoes the Veteran's jobs
	 *
	 * @return void
	 */
	public function the_jobs(): void {
		echo $this->get_the_jobs();
	}

	/**
	 * Get the Veteran's advanced training
	 *
	 * @return ?string
	 */
	public function get_the_advanced_training(): ?string {
		return join( ', ', $this->advanced_training );
	}

	/**
	 * Echoes the Veteran's advanced training
	 *
	 * @return void
	 */
	public function the_advanced_training(): void {
		echo $this->get_the_advanced_training();
	}

	/**
	 * Get the Veteran's highest achieved rank
	 *
	 * @return ?string
	 */
	public function get_the_highest_achieved_rank(): ?string {
		return $this->highest_achieved_rank;
	}

	/**
	 * Echoes the Veteran's highest achieved rank
	 *
	 * @return void
	 */
	public function the_highest_achieved_rank(): void {
		echo $this->get_the_highest_achieved_rank();
	}

	/**
	 * Get the Veteran's military unit(s)
	 *
	 * @return ?string
	 */
	public function get_the_military_units(): ?string {
		if ( ! $this->military_units ) {
			return null;
		}
		return implode( ', ', $this->military_units );
	}

	/**
	 * Echoes the Veteran's military unit(s)
	 *
	 * @return void
	 */
	public function the_military_units(): void {
		echo $this->get_the_military_units();
	}

	/**
	 * Get the Veteran's Choctaw Veteran of the Month data
	 *
	 * @return ?string
	 */
	public function get_the_choctaw_veteran_of_the_month(): ?string {
		if ( ! $this->choctaw_veteran_of_the_month || empty( $this->choctaw_veteran_of_the_month ) ) {
			return '';
		}
		$years     = array();
		$districts = array();
		foreach ( $this->choctaw_veteran_of_the_month as $choctaw_veteran_of_the_month ) {
			$years[]     = absint( $choctaw_veteran_of_the_month->year );
			$districts[] = absint( $choctaw_veteran_of_the_month->district );
		}
		$years     = implode( ', ', $years );
		$districts = implode( ', ', $districts );
		return "Received {$years} - District {$districts}";
	}

	/**
	 * Echoes the Veteran's Choctaw Veteran of the Month data
	 *
	 * @return void
	 */
	public function the_choctaw_veteran_of_the_month(): void {
		echo $this->get_the_choctaw_veteran_of_the_month();
	}

	/**
	 * Get the Veteran's additional materials
	 *
	 * @return ?string
	 */
	public function get_the_additional_materials(): ?string {
		if ( ! $this->has_additional_materials ) {
			return '';
		}

		$additional_materials = array();
		foreach ( $this->additional_materials as $additional_material ) {
			$target = str_contains( $additional_material->url, get_site_url() ) ? '' : 'target="_blank"';
			switch ( $additional_material->type ) {
				case 'photo-gallery':
					$icon = '<i class="fa-solid fa-images"></i> ';
					break;
				case 'audio':
					$icon = '<i class="fa-solid fa-volume-high"></i> ';
					break;
				default:
					$icon = '<i class="fa-solid fa-up-right-from-square"></i> ';
					break;
			}
			$additional_materials[] = "<a href='{$additional_material->url}' {$target}>{$icon} {$additional_material->description}</a>";
		}
		return implode( ', ', $additional_materials );
	}

	/**
	 * Echoes the Veteran's additional materials
	 *
	 * @return void
	 */
	public function the_additional_materials(): void {
		echo $this->get_the_additional_materials();
	}

	/**
	 * Whether the veteran has content to display inside of 'tabbed content'
	 *
	 * @return bool
	 */
	public function has_tabbed_content(): bool {
		return ! empty( $this->get_the_decorations() )
			|| ! empty( $this->advanced_training )
			|| ! empty( $this->overseas_duty )
			|| ! empty( $this->jobs );
	}

	/**
	 * Whether the veteran has content to display inside of 'additional materials'
	 *
	 * @return bool
	 */
	public function needs_additional_materials_modal(): bool {
		return $this->needs_additional_materials_modal;
	}
}
