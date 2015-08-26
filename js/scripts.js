$(function()
{
	var jsonData,
		$progressBar = $('.progress-bar'),
		$progressText = $('.progress-text'),
		$progressComplete = $('.progress-complete');


	//open lightbox & (re)start loading
	function openLightbox()
	{
		$progressBar.css("width", 0);
		$('.lightbox-container, .page-shadow').show();
		loadProgress(jsonData);
	};

	//close lightbox
	function closeLightbox()
	{
		$('.lightbox-container, .page-shadow').hide();
		$progressText.show();
		$progressComplete.hide();
		$progressBar.removeClass('complete');
	};

	//fill the progress bar
	function loadProgress(data)
	{
	    //step through values to animate bar
		$({progress: data.start}).animate({progress: data.finish},
		{
			duration: data.duration,
			step: function()
			{
				var currentProgress = Math.round(this.progress);
				//increase width of progress bar
				$progressBar.css("width", currentProgress + '%');

				//update text
				$('.progress-percent').text(currentProgress);
			},
			complete: function()
			{
				//show complete state
				$progressBar.addClass('complete');
				$progressText.hide();
				$progressComplete.show();
			}
		});
	};

	//load data.json & animate loading
	$.getJSON("js/data.json", function(json)
	{
		jsonData = json.data.lightbox;
		loadProgress(jsonData);
	});

	//open lightbox on click of button
	$('.open-button').click(function()
	{
		openLightbox();
	});

	//close lightbox on click of close button or page shadow
	$('.close-button, .page-shadow').click(function()
	{
		closeLightbox();
	});
});