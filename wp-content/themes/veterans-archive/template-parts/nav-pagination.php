<nav aria-label="Search Results Pagination">
	<ul class="pagination justify-content-center">
		<?php
		echo paginate_links(
			array(
				'type'      => 'list',
				'total'     => $search_results->max_num_pages,
				'prev_text' => '&laquo;',
				'next_text' => '&raquo;',
			)
		);
		?>
	</ul>
</nav>
