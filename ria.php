<?php
/**
 * Plugin Name:       Ria
 * Plugin URI:        https://github.com/marcelCarpinter/RIA
 * Description:       Add a shortcode to use: [ria-map] 
 * Version:           1.10.3
 * Requires at least: 5.2
 * Requires PHP:      7.2
 * Author:            Marcel Carpinter, Romina Vera, Gastón Pacella
 * License:           GPL v2 or later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 */

register_activation_hook( __FILE__, 'ria_myplugin_activate' );
add_action( 'init', 'ria_myplugin_activate' );

 
function ria_myplugin_activate() {
    addMapsScripts();

	add_shortcode( 'ria-map', 'add_ria_code' );
}

// Add Shortcode
function add_ria_code() {

	$currentYear = date('Y');
	ob_start();
	?>
	<div id="map" class="map"></div>
	<!--<pre id='coordenadas'></pre>-->
	<!--<div id="banderas"></div>-->

	<div class="container container-holidays hidden">
		<div class="row">
			<div class="col-sm-12 col-md-3">
				<div id="wiki" class="wiki">
					<p id="info"></p>
				</div>
				<div id="banderas"></div>
			</div>
			<div class="col-sm-12 col-md-9">
				<form>
					<div class="row">
						<div class="col-sm-12 col-md-6">
							<div class="form-group">
								<label>Filtrar por A&ntildeo</label>
								<select id="sanio" class="form-control filter-holidays" aria-label="Elegir" onchange="actualizarAnio()">
									<option value="<?php echo date("Y", strtotime("-1 years")); ?>"><?php echo date("Y", strtotime("-1 years")); ?></option>
									<option selected value="<?php echo $currentYear; ?>"><?php echo $currentYear; ?></option>
									<option value="<?php echo date("Y", strtotime("+1 years")); ?>"><?php echo date("Y", strtotime("+1 years")); ?></option>
								</select>
							</div>
						</div>
						<div class="col-sm-12 col-md-6">
			            	<div class="form-group">
								<label>Filtrar por Tipo</label>
								<select id="holidayType" class="form-control filter-holidays" aria-label="Elegir" onchange="filterType()">
									<option value="" selected>Todos</option>	
			                    	<option value="national">Nacional</option>
									<option value="local">Local</option>
									<option value="religious">Religioso</option>
			                    	<option value="observance">Observancia</option>
								</select>
							</div>
						</div>
					</div>
				</form>
				<div class="table-responsive ">
					<table class="table table-striped table-hover" id = "tabla" table-sm cellspacing="0" width="100%">
				     <thead>
							<tr>
								<th>Fecha</th>
								<th>Nombre</th>
								<th>Descripcion</th>
								<th>Tipo</th>
							</tr>
						</thead>  
						<tbody>
						</tbody>

						<tfoot>
							<tr>
								<th>Fecha</th>
								<th>Nombre</th>
								<th>Descripcion</th>
								<th>Tipo</th>
							</tr>
						</tfoot>

					</table>
				   </div>
			</div>
		</div>
	</div>

   
	<?php
	return ob_get_clean();
}


function addMapsScripts(){
	if(is_admin()) {
		return false;
	}
	wp_register_script( 'api-maps', 'https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-geocoder/v2.3.0/mapbox-gl-geocoder.min.js', array(), '1.0.0', true );
	wp_enqueue_script( 'api-maps' );

	wp_register_style(
    'api-maps-css', // handle name
    'https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-geocoder/v2.3.0/mapbox-gl-geocoder.css', // the URL of the stylesheet
    array( ), // an array of dependent styles
    '1.0.0' // version number
	);

	wp_enqueue_style( 'api-maps-css' );

	wp_register_script( 'api-maps2', 'https://api.mapbox.com/mapbox-gl-js/v2.2.0/mapbox-gl.js', array(), '1.0.0', true );
	wp_enqueue_script( 'api-maps2' );

	wp_register_style(
    'api-maps-css2', // handle name
    'https://api.mapbox.com/mapbox-gl-js/v2.2.0/mapbox-gl.css', // the URL of the stylesheet
    array(  ), // an array of dependent styles
    '1.0.0' // version number
	);

	wp_enqueue_style( 'api-maps-css2' );

	wp_register_script( 'api-maps-ria', plugin_dir_url(__FILE__) . 'js/maps.js', array(), '1.2.12', true );
	wp_enqueue_script( 'api-maps-ria' );

	wp_register_style(
    	'fontawesome-ria', // handle name
    	'https://use.fontawesome.com/releases/v5.7.1/css/all.css', // the URL of the stylesheet
   	 	array(), // an array of dependent styles
   		'1.0.0' // version number
    );

	wp_enqueue_style( 'fontawesome-ria' );

	wp_enqueue_script( 'popper_js', 
  					'https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js', 
  					array(), 
  					'1.14.3', 
  					true); 
	wp_enqueue_script( 'bootstrap_js', 
  					'https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js', 
  					array('jquery','popper_js'), 
  					'4.1.3', 
  					true); 

	wp_enqueue_style( 'bootstrap_css', 
  					'https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css', 
  					array(), 
  					'4.1.3'
  					); 


	wp_register_script( 'datatables-ria', 'https://cdn.datatables.net/1.10.24/js/jquery.dataTables.min.js', array("jquery"), '1.0.0', true );
	wp_enqueue_script( 'datatables-ria' );
	
	wp_register_style(
    'datatables-ria-css', // handle name
    'https://cdn.datatables.net/1.10.24/css/jquery.dataTables.min.css', // the URL of the stylesheet
    array(  ), // an array of dependent styles
    '1.0.0' // version number
	);

	wp_enqueue_style( 'datatables-ria-css' );	

	wp_register_style(
    'api-maps-ria-css', // handle name
    plugin_dir_url(__FILE__) . 'css/styles.css',
    array(), // an array of dependent styles
    '1.0.1' // version number
	);

	wp_enqueue_style( 'api-maps-ria-css' );
}
