<?php
/**
 * Class: Additional Materials
 *
 * @package ChoctawNation
 * @subpackage ACF\Veteran_Data_Types
 */

namespace ChoctawNation\ACF\Veteran_Data_Types;

/**
 * Class Additional_Material
 * Data type for additional materials
 */
class Additional_Material {
	/**
	 * Description of material
	 *
	 * @var string $description
	 */
	public ?string $description;

	/**
	 * Type of material as an array
	 *
	 * @var ?array $type
	 */
	public ?array $type;

	/**
	 * URL of material
	 *
	 * @var ?string $url
	 */
	public ?string $url;

	/**
	 * Array of URLs for photo gallery
	 *
	 * @var string[]|null $photo_gallery
	 */
	public ?array $photo_gallery;

	/**
	 * Constructor
	 *
	 * @param array $acf ACF data
	 */
	public function __construct( array $acf ) {
		$this->description = esc_textarea( $acf['description_of_material'] );
		$this->type        = $acf['material_type'];
		$this->set_the_url( $acf );
		if ( ! empty( $acf['photo_gallery'] ) ) {
			foreach ( $acf['photo_gallery'] as $photo ) {
				$this->photo_gallery[] = $photo['url'];
			}
		} else {
			$this->photo_gallery = null;
		}
	}

	/**
	 * Sets the URL
	 *
	 * @param array $acf ACF data
	 */
	private function set_the_url( array $acf ) {
		if ( ! empty( $acf['material_url'] ) ) {
			$this->url = esc_url( $acf['material_url'] );
		} elseif ( ! empty( $acf['pdf'] ) ) {
			$this->url = esc_url( $acf['pdf'] );
		} elseif ( ! empty( $acf['audio_file'] ) ) {
			$this->url = esc_url( $acf['audio_file']['url'] );
		} else {
			$this->url = null;
		}
	}
}
