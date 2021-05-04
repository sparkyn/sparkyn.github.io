function drawDonut(thisDonutID) {
		
		setID = '#' + thisDonutID;
		
		thisDonut = $(setID);
		
		thisDonutTitle = thisDonut.children('h3');
	
		newDataLabels = [];
		thisDonut.find('table.sys_donutValues th').each(function() {
			var thisLabel = $(this).text(); 
			
			newDataLabels.push(thisLabel); 
		});
		
		newDataValues = [];
		thisDonut.find('table.sys_donutValues td').each(function() {
			var thisValue = $(this).text(); 
			thisValue = parseInt(thisValue); 
			newDataValues.push(thisValue); 
		});
		
		length = newDataLabels.length;
		newData = [];
		for (var i = 0; i < length; i++) {
			arrayToPush = [];
			arrayToPush[0] = newDataLabels[i];
			arrayToPush[1] = newDataValues[i];
			newData.push(arrayToPush);	
		}

		// special script to build an array containing only the values in the data array that have not been set to zero - added by SP
		var length = newData.length;
		trimmedData = [];
		for (var i = 0; i < length; i++) {    
			if (newData[i][1] !== 0) { 
				trimmedData.push(newData[i]); 
			} 
		}
		
		// special script to write out the data labels how I want because jqplot does not as standard - added by SP
		length = trimmedData.length;
		dataLabels = [];
		for (var i = 0; i < length; i++) { 
			var labelValue = trimmedData[i][1] + "% " + trimmedData[i][0]; 
			dataLabels.push(labelValue); 
		}
		
		
		plot1 = jQuery.jqplot (thisDonutID, [trimmedData],
		{ 
			seriesColors: [ '#232020', '#617dbd', '#fccf91', '#fbb962', '#abacae', '#464647', '#0e3182'],
			seriesDefaults: { 
				renderer: jQuery.jqplot.DonutRenderer, 
				rendererOptions: { 
					showDataLabels: false, 
					thickness: 26, 
					highlightMouseOver: false          
				}, 
				shadow: false
			},
			title: { 
				text: thisDonutTitle, 
				show: true, 
				textAlign: 'left' 
			},
			grid: { 
				borderWidth: 0, 
				background: 'transparent',
				shadow: false 
			},
			legend: { 
				show:true, 
				background: 'transparent',
				location: 'e', 
				rowSpacing: '0.2em', 
				border: 'none', 
				labels: dataLabels 
			}   
		}
		); 
		
		
}
