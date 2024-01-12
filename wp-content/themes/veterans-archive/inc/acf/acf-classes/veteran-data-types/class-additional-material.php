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
	 * Type of material. "photo-gallery", "link" or "audio"
	 *
	 * @var ?string $type
	 */
	public ?string $type;

	/**
	 * URL of material
	 *
	 * @var ?string $url
	 */
	public ?string $url;

	/**
	 * Constructor
	 *
	 * @param array $acf ACF data
	 */
	public function __construct( array $acf ) {
		$this->description = esc_textarea( $acf['description_of_material'] );
		$this->type        = $acf['material_type'];
		$this->url         = esc_url( $acf['material_link'] );
	}
}
