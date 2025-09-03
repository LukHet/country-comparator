$(function () {
  //initializing variables
  const API_URL = "https://geoapi.info/api/";
  const API_COUNTRIES_LIMIT = 245;
  const firstSelectId = "autocomplete-one";
  const secondSelectId = "autocomplete-two";
  const availableTags = [];
  const availableCountries = [];
  const upIcon =
    '<img src="icons/arrow.png" alt="Up" style="width:24px; height:24px; margin-left:5px;">';
  let firstSelected = false;
  let secondSelected = false;

  //handler for selecting in autocomplete
  const handleAutocompleteSelect = (e, ui) => {
    availableTags.forEach((el) => {
      if (el.name === ui.item.value) {
        fetch(API_URL + `country?code=${el.code}`)
          .then((r) => r.json())
          .then((data) => {
            if (e.target.id === firstSelectId) {
              handleResponse(firstSelectId, data);
              firstSelected = true;
            } else if (e.target.id === secondSelectId) {
              handleResponse(secondSelectId, data);
              secondSelected = true;
            }
          })
          .then(() => {
            if (firstSelected && secondSelected) {
              $(".compare-info").slideToggle(600);
              handleMetricsComparison();
            }
          });
      }
    });
  };

  const handleResponse = (id, element) => {
    $(`#${id}_surface`).text(() => {
      return element.surfaceArea ? `${element.surfaceArea}` : "n/a";
    });

    $(`#${id}_name`).text(() => {
      return element.name ? `${element.name}` : "n/a";
    });

    $(`#${id}_population`).text(() => {
      return element.population ? `${element.population}` : "n/a";
    });

    $(`#${id}_population-density`).text(() => {
      return element.populationDensity
        ? `${element.populationDensity.toFixed(2)}`
        : "n/a";
    });

    $(`#${id}_life-expectancy`).text(() => {
      return element.lifeExpectancy ? `${element.lifeExpectancy}` : "n/a";
    });

    $(`#${id}_average-temperature`).text(() => {
      return element.averageTemperature
        ? `${element.averageTemperature}`
        : "n/a";
    });

    $(`#${id}_flag`).attr("src", `${element.flags.rectangular}`);

    $(`#${id}_government-type`).text(() => {
      return element.governmentType ? `${element.governmentType}` : "n/a";
    });

    $(`#${id}_religion`).text(() => {
      return element.religion ? `${element.religion}` : "n/a";
    });

    $(`#${id}_driving-side`).text(() => {
      return element.drivingSide ? `${element.drivingSide}` : "n/a";
    });

    $(`#${id}_continent`).text(() => {
      return element.continent ? `${element.continent}` : "n/a";
    });

    $(`#${id}_capital-city`).text(() => {
      return element.capitalCity ? `${element.capitalCity}` : "n/a";
    });

    $(`#${id}_currency`).text(() => {
      return element.currencyName ? `${element.currencyName}` : "n/a";
    });
  };

  const handleAreaComparison = () => {
    const firstCountrySurfaceArea = Number(
      $(`#${firstSelectId}_surface`).text()
    );
    const secondCountrySurfaceArea = Number(
      $(`#${secondSelectId}_surface`).text()
    );

    if (firstCountrySurfaceArea > secondCountrySurfaceArea) {
      const currentText = $(`#${firstSelectId}_surface`).text();
      $(`#${firstSelectId}_surface`).html(currentText + upIcon);
    } else if (secondCountrySurfaceArea > firstCountrySurfaceArea) {
      const currentText = $(`#${secondSelectId}_surface`).text();
      $(`#${secondSelectId}_surface`).html(currentText + upIcon);
    }
  };

  const handlePopulationComparison = () => {
    const firstCountryPopulation = Number(
      $(`#${firstSelectId}_population`).text()
    );
    const secondCountryPopulation = Number(
      $(`#${secondSelectId}_population`).text()
    );

    if (firstCountryPopulation > secondCountryPopulation) {
      const currentText = $(`#${firstSelectId}_population`).text();
      $(`#${firstSelectId}_population`).html(currentText + upIcon);
    } else if (secondCountryPopulation > firstCountryPopulation) {
      const currentText = $(`#${secondSelectId}_population`).text();
      $(`#${secondSelectId}_population`).html(currentText + upIcon);
    }
  };

  const handlePopulationDensityComparison = () => {
    const firstCountryPopulationDensity = Number(
      $(`#${firstSelectId}_population-density`).text()
    );
    const secondCountryPopulationDensity = Number(
      $(`#${secondSelectId}_population-density`).text()
    );

    if (firstCountryPopulationDensity > secondCountryPopulationDensity) {
      const currentText = $(`#${firstSelectId}_population-density`).text();
      $(`#${firstSelectId}_population-density`).html(currentText + upIcon);
    } else if (secondCountryPopulationDensity > firstCountryPopulationDensity) {
      const currentText = $(`#${secondSelectId}_population-density`).text();
      $(`#${secondSelectId}_population-density`).html(currentText + upIcon);
    }
  };

  const handleLifeExpectancyComparison = () => {
    const firstCountryLifeExpectancy = Number(
      $(`#${firstSelectId}_life-expectancy`).text()
    );
    const secondCountryLifeExpectancy = Number(
      $(`#${secondSelectId}_life-expectancy`).text()
    );

    if (firstCountryLifeExpectancy > secondCountryLifeExpectancy) {
      const currentText = $(`#${firstSelectId}_life-expectancy`).text();
      $(`#${firstSelectId}_life-expectancy`).html(currentText + upIcon);
    } else if (secondCountryLifeExpectancy > firstCountryLifeExpectancy) {
      const currentText = $(`#${secondSelectId}_life-expectancy`).text();
      $(`#${secondSelectId}_life-expectancy`).html(currentText + upIcon);
    }
  };

  const handleAverageTemperatureComparison = () => {
    const firstCountryAverageTemperature = Number(
      $(`#${firstSelectId}_average-temperature`).text()
    );
    const secondCountryAverageTemperature = Number(
      $(`#${secondSelectId}_average-temperature`).text()
    );

    if (firstCountryAverageTemperature > secondCountryAverageTemperature) {
      const currentText = $(`#${firstSelectId}_average-temperature`).text();
      $(`#${firstSelectId}_average-temperature`).html(currentText + upIcon);
    } else if (
      secondCountryAverageTemperature > firstCountryAverageTemperature
    ) {
      const currentText = $(`#${secondSelectId}_average-temperature`).text();
      $(`#${secondSelectId}_average-temperature`).html(currentText + upIcon);
    }
  };

  const handleMetricsComparison = () => {
    handleAreaComparison();
    handlePopulationComparison();
    handlePopulationDensityComparison();
    handleLifeExpectancyComparison();
    handleAverageTemperatureComparison();
  };

  //initially hide table
  $(".compare-info").hide();

  //fetching all existing countries
  fetch(API_URL + `countries?limit=${API_COUNTRIES_LIMIT}`)
    .then((r) => r.json())
    .then((data) => {
      data.countries.forEach((el) => {
        availableTags.push({ name: el.name, code: el.code });
      });
      availableTags.forEach((el) => availableCountries.push(el.name));
    });

  //assigning existing countries to both autocpmplete inputs
  $(`#${firstSelectId}, #${secondSelectId}`).autocomplete({
    source: function (request, response) {
      const matcher = new RegExp(
        "^" + $.ui.autocomplete.escapeRegex(request.term), //matching only first letters
        "i"
      );
      response(
        $.grep(availableCountries, function (item) {
          return matcher.test(item);
        })
      );
    },
    select: (e, ui) => handleAutocompleteSelect(e, ui),
  });
});
