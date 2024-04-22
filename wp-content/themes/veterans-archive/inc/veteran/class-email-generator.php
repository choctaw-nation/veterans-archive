<?php
/**
 * Class: Email Generator
 * Handles Email notifications for Veteran submissions.
 *
 * @package ChoctawNation
 */

namespace ChoctawNation;

use WP_Error;

/**
 * Email Generator
 * Handles Email notifications for Veteran submissions.
 */
class Email_Generator {
	/**
	 * Veteran Data
	 *
	 * @var Veteran_Factory $veteran
	 */
	private Veteran_Factory $veteran;

	/**
	 * Veteran Data
	 *
	 * @var string|false $veteran_data
	 */
	private $veteran_data;

	/**
	 * Admin Email
	 *
	 * @var string $admin_email
	 */
	private string $admin_email;

	/**
	 * Headers
	 *
	 * @var array $headers
	 */
	private array $headers;

	/**
	 * Veteran Name
	 *
	 * @var string $veteran_name
	 */
	private string $veteran_name;

	/**
	 * Submitter Email
	 *
	 * @var string $submitter_email
	 */
	private string $submitter_email;

	/**
	 * Submitter Name
	 *
	 * @var string $submitter_name
	 */
	private string $submitter_name;

	/**
	 * Constructor
	 *
	 * @param Veteran_Factory $veteran Veteran Data.
	 */
	public function __construct( Veteran_Factory $veteran ) {
		$this->admin_email     = 'judy.allen@choctawnation.com';
		$this->veteran         = $veteran;
		$this->veteran_data    = wp_json_encode( $this->veteran, JSON_PRETTY_PRINT );
		$this->veteran_name    = $this->veteran->first_name . ' ' . $this->veteran->last_name;
		$this->headers         = array(
			'Content-Type: text/html; charset=UTF-8',
			'From: Choctaw Nation Veterans Archive <no-reply@' . $_SERVER['HTTP_HOST'] . '>',
		);
		$this->submitter_email = $this->veteran->user_email;
		$this->submitter_name  = $this->veteran->user_name;
	}

	/**
	 * Send Emails
	 *
	 * @return string|void
	 */
	public function send_emails() {
		try {
			$this->send_user_email();
			$this->send_admin_email();
		} catch ( \WP_Error $e ) {
			return 'Error sending emails: ' . $e->get_error_message();
		}
	}

	/**
	 * Send email to User that their Veteran has been submitted and is ready for review
	 *
	 * @throws \WP_Error Throws an error if the email fails to send.
	 */
	private function send_user_email() {
		$subject   = 'New Veteran Submitted!';
		$headers   = $this->headers;
		$headers[] = 'Reply-To: ' . $this->submitter_email;

		$body = "
		<p>Veteran {$this->veteran_name} has been submitted to the database by {$this->veteran->user_name}.</p>
		<p>Their email: {$this->submitter_email}</p>";
		if ( $this->veteran->has_media_material ) {
			$body .= "<p>{$this->submitter_name} also has additional media materials for {$this->veteran_name}, so they will need a follow-up email. Replying to this email <em>should</em> automatically send a message to them, but that doesn't work 100% of the time. <b>Please take care that you reply is going to {$this->submitter_email}</b>.</p>";
		}
		$body .= "
		<p>Please login to review the submission.</p>
		<p>Submitted Data: {$this->veteran_data}</p>
		";

		$message = wp_mail( $this->admin_email, $subject, $body, $headers );
		if ( ! $message ) {
			throw new WP_Error( 'email_failed', "Failed to send email to {$this->submitter_name}.", $this->veteran_data ); // phpcs:ignore
		}
	}

	/**
	 * Send email to Admin that a new Veteran has been submitted and is ready for review
	 *
	 * @throws \WP_Error Throws an error if the email fails to send.
	 */
	private function send_admin_email() {
		$to        = "{$this->veteran->user_name} <{$this->submitter_email}>";
		$subject   = 'Yakoke for your submission!';
		$headers   = $this->headers;
		$headers[] = 'Reply-To: ' . $this->admin_email;

		$body = "
		<p>{$this->veteran_name} has been submitted for review! If you have any questions, please reach out {$this->admin_email}</p>
		<p>Submitted Data: {$this->veteran_data}</p>";

		$message = wp_mail( $to, $subject, $body, $headers );
		if ( ! $message ) {
			throw new \WP_Error( 'email_failed', 'Failed to send admin notice email.', $this->veteran_data ); // phpcs:ignore
		}
	}
}
