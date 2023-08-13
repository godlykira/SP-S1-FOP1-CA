 // Name : MIN THIT KHINE
// Class: DCITP/FT/1A/04
// Adm  : 2334327
// --------------------------------------------------------------------
// Packages
const Movie = require('./movie.js');
const readline = require('readline-sync');
var exit_program = false;
// Functions
function validation(variable, largeNum = 0, smallNum = 0) {
	const pattern = /^[0-9]+$/;
	if (typeof variable === "string") {
		return pattern.test(variable);
	}
	if (typeof variable === "number" && Number.isInteger(variable)) {
		return variable >= smallNum && variable <= largeNum;
	}
} 
function menu(n, movieList) {
    var selection;
    if (n == 1) {
        console.log(`\nHi ${userName}, please select your choice: 
        1. Display All Movie
        2. Add Movie
        3. Add Rating
        4. Latest 3 Release Date
        5. Filter by Genre
        6. Advanced Search
        7. Edit Movie
        8. Delete Movie
        9. Exit`);
        selection = readline.question("\t>> ");
        return selection;
    } else if (n == 2) {
        console.log("\n\tPlease enter Movie's genre(s):");
    }
    for (let i = 0; i < 9; i++) {
        console.log(`\t${i+1}) ${getGenre(i+1, movieList)}`);
    }
    selection = readline.question("\t>> ");
    return selection;
}
function getGenre(num, movieList) {
    var genre = [];
    for (let i = 0; i < movieList.length; i++) {
        const movieGenre = movieList[i].genre;
        for (let j = 0; j < movieGenre.length; j++) {
            genre.push(movieGenre[j]);
        }
    }
    genre = Array.from(new Set(genre)).sort();
    return genre[num-1];
}
function addMovieName() {
    var valid = false;
    var movieName;
    do {
        movieName = readline.question("\n\tPlease enter Movie's name: ");
        // Check if the movie name is unique (every() is the same as for loop and uses function (movie))
        valid = movieList.every(movie => movie.name.toLowerCase() != movieName.toLowerCase() && movieName != "");
        if (!valid) {
            console.log("\tPlease enter a unique movie name!");
        }
    } while (!valid);
    return movieName;
}
function addMovieGenre(movieList) {
    const genres = [];
    const userInput = menu(2, movieList).split(/[ ,]+/);
    const uniqueGenres = Array.from(new Set(userInput));
    for (const genre of uniqueGenres) {
        const genreNum = parseInt(genre);
        if (validation(genreNum, 9, 1)) {
            let temp = getGenre(genre, movieList);
            if (temp !== null) {
                genres.push(temp);
            } else {
                console.log("\tPlease enter a valid genre option(s)!");
                return addMovieGenre(movieList);
            }
        } else {
            console.log("\tPlease enter a valid genre option(s)!");
            return addMovieGenre(movieList);
        }
    }
    return genres.sort();
}
// change later
function addMovieRdate() {
    const validMonthsf = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const validMonths = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    var releaseDate = readline.question("\n\tPlease enter Movie's release date: ");
    var [day, month, year] = releaseDate.split(" ");
    month = month[0].toUpperCase() + month.slice(1).toLowerCase();
    if ((parseInt(day) >= 1 && parseInt(day) <= 31) && (() => {
        return valid = validMonthsf.includes(month) || validMonths.includes(month);
    })() && (() => {
        return /^\d{4}$/.test(year) ? year !== '0000' : false;
    })()) {
        if (validMonths.includes(month)) {
            const tempOut = day + " " + month + " " + year;
            return tempOut;
        } else {
            month = validMonths[validMonthsf.indexOf(month)];
            const tempOut = day + " " + month + " " + year;
            return tempOut;
        }
    } else {
        console.log("\tPlease enter a valid release date!");
        return addMovieRdate();
    }
}
function addMovieRtime() {
    // Prompt the user to enter the movie's running time
    var runningTime = readline.question("\n\tPlease enter Movie's running Time (min):");
    // Check if the running time is valid
    if (validation(runningTime) && runningTime != '0') {
        return parseInt(runningTime);
    } else {
        console.log("\tPlease enter valid running time!");
        return addMovieRtime();
    }
}
function showMovieList(msg, movieList) {
    console.log(`\n\t${msg}`);
    // Display the list of movies with their corresponding numbers
    for (var i = 0; i < movieList.length; i++) {
        console.log(`\t${i+1}) ${movieList[i].name}`);
    }
    console.log(`\t${movieList.length+1}) Go Back to Main Menu`);
    const movieNumber = readline.question("\t>> ");
    const parsedMovieNumber = parseInt(movieNumber);
    // Validate the user input
    if (validation(movieNumber) && validation(parsedMovieNumber, movieList.length, 1)) {
        return parsedMovieNumber;
    } else if (parsedMovieNumber == movieList.length+1) {
        return 0;
    } else {
        console.log("\n\tKindly enter a valid input!");
        return showMovieList(msg, movieList);
    }
}
function updateMovieRating(index, movieList) {
    if (index != 0) {
        do {
            var rating = readline.question(`\n\tEnter your rating for "${movieList[index-1].name}" (1 to 5 inclusive): `);
            if (validation(rating) && validation(parseInt(rating), 5, 1)) {
                movieList[index - 1].rating[0] += 1;
                movieList[index - 1].rating[1] += parseInt(rating);
                break;
            } else {
                console.log("\n\tEnter a valid rating!");
            }
        } while (true);
    }
}
function latestDates(movieList) {
    const latestDates = [];
    for (let i = 0; i < movieList.length; i++) {
        const movie = movieList[i];
        const movieDate = new Date(movie.releaseDate.toLowerCase());
        if (latestDates.length < 3) {
            latestDates.push({ date: movieDate, index: i });
        } else {
            latestDates.sort((a, b) => b.date - a.date);
            if (movieDate > latestDates[latestDates.length - 1].date) {
                latestDates.pop();
                latestDates.push({ date: movieDate, index: i });
            }
        }
    }
    latestDates.sort((a, b) => b.date - a.date);
    console.log("\n\tThe Latest 3 movies are:");
    for (var j = 0; j < latestDates.length; j++) {
        var movie = movieList[latestDates[j].index];
        console.log(`\t${j + 1}) ${movie.releaseDate} - ${movie.name}`);
    }
}
function filterByGenre(movieList) {
    var genreArr = new Array();
    for (var i = 0; i < movieList.length; i++) {
        var movie = movieList[i].genre;
        for (var j = 0; j < movie.length; j++) {
            genreArr.push(movie[j]);
        }
    }
    const genreArrSorted = Array.from(new Set(genreArr));
    genreArrSorted.sort();
    console.log("\n\tPlease select a gerne:");
    for (var i = 0; i < genreArrSorted.length; i++) {
        console.log(`\t${i+1}) ${genreArrSorted[i]}`);
    }
    var choice = readline.question("\t>> ");            // Filter By Genre menu
    if (validation(choice) && validation(parseInt(choice), 9, 1) && !(/[ ,]+/.test(choice))) {
        var num = 1;
        console.log(`\n\tYou have selected "${getGenre(choice, movieList)}" genre:`);
        for (var i = 0; i < movieList.length; i++) {
            var tempGenre = movieList[i].genre;
            for (var j = 0; j < tempGenre.length; j++) {
                if (tempGenre[j] == getGenre(choice, movieList)) {
                    console.log(`\t${num++}) ${movieList[i].name}`);
                }
            }
        }
    } else {
        console.log("\tPlease enter a valid gerne input!");
        return filterByGenre(movieList);
    }
}
function editMovie(index, movieList) {
    var tempData;
    if (index != 0) {
        tempData = new Movie(movieList[index - 1].name, [...movieList[index - 1].genre], movieList[index - 1].runningTime, movieList[index - 1].releaseDate, [...movieList[index - 1].rating]); // Create a separate copy of movieList
        const backupData = [movieList[index - 1].name, movieList[index - 1].genre, movieList[index - 1].runningTime, movieList[index - 1].releaseDate, movieList[index - 1].rating];   // Store original data in backupData
        do {
            console.log(`\n\tYou have selected "${tempData.name}" movie`);
            console.log(`\t1) Edit Movie's name\n\t2) Edit Movie's Genre\n\t3) Edit Movie's Running Time\n\t4) Edit Movie's Release Date\n\t5) Edit Movie's Rating\n\t6) Restore Default Values\n\t7) Go Back to Main Menu`);
            var choice = readline.question("\t>> ");
            if (validation(choice) && validation(parseInt(choice), 7, 1)) {
                if (choice == 1) {
                    tempData.name = readline.question("\n\tPlease enter new Movie's name: ");
                    console.log(`\n\tMovie's name successfully updated!\n${tempData.displayMovieDetails()}`);
                } else if (choice == 2) {
                    editGenre(backupData);
                } else if (choice == 3) {
                    editRtime();
                } else if (choice == 4) {
                    editRdate();
                } else if (choice == 5) {
                    tempData.rating[0] = readline.question("\n\tPlease enter new Movie's total votes: ");
                    tempData.rating[1] = readline.question("\n\tPlease enter new Movie's rating per voter: ");
                    console.log(`\n\tMovie's rating successfully updated!\n${tempData.displayMovieDetails()}`);
                } else if (choice == 6) {
                    tempData.name = backupData[0];
                    tempData.genre = backupData[1];
                    tempData.runningTime = backupData[2];
                    tempData.releaseDate = backupData[3];
                    tempData.rating = backupData[4];
                    console.log("\n\tMovie successfully restored!");
                    console.log(`\n${movieList[index - 1].displayMovieDetails()}`);
                } else if (choice == 7) {
                    movieList[index - 1].name = tempData.name;
                    movieList[index - 1].genre = tempData.genre;
                    movieList[index - 1].runningTime = tempData.runningTime;
                    movieList[index - 1].releaseDate = tempData.releaseDate;
                    movieList[index - 1].rating = tempData.rating;
                    console.log(`\n\tMovie successfully updated!\n${movieList[index - 1].displayMovieDetails()}`);
                }
            } else {
                console.log("\tPlease enter a valid input!");
            }
        } while (choice != 7);
    }
    function editGenre(backupData) {
        function getgenre(genre) {
			var genreArr = [];
			for (let i = 0; i < 9; i++) {
				genreArr.push(getGenre(i + 1, movieList));
			}
			for (let i = 0; i < genre.length; i++) {
				for (let j = 0; j < genreArr.length; j++) {
					if (genre[i] == genreArr[j]) {
						genreArr.splice(j, 1);
					}
				}
			}
			console.log("\n\tPlease enter new Movie's genre(s):");
			genreArr.forEach((element, i) => {
				console.log(`\t${i + 1}) ${element}`);
			});
            return genreArr;
		}
        var genre = tempData.genre;
        var choice;
        while (true) {
            console.log(`\n\tPlease select a genre or add new:`);
            genre.forEach((element, i) => {
                console.log(`\t${i+1}) ${element}`);
            });
            console.log(`\t${genre.length+1}) Add new Genre`);
            console.log(`\t${genre.length+2}) Go Back to Main Menu`);
            choice = readline.question("\t>> ");
            if (validation(choice) && validation(parseInt(choice), genre.length+2, 1)) {
                break;
            } else {
                console.log("\tPlease enter a valid input!");
            }
        }
        if (choice == genre.length+1) {
            do {
                valid = false;
                const genreArr = getgenre(genre);
                console.log(`\t${genreArr.length+1}) Go Back`);
                const userInput = readline.question("\t>> ").split(/[ ,]+/);
                if (!(userInput.includes(`${genreArr.length+1}`))) {
                    const uniqueGenres = Array.from(new Set(userInput.sort()));
                    for (const item of uniqueGenres) {
                        const genreNum = parseInt(item);
                        if (validation(genreNum, genreArr.length, 1)) {
                            tempData.genre.push(genreArr[genreNum-1]);
                            valid = true;
                        } else {
                            console.log("\tPlease enter a valid genre option(s)!");
                            genre = backupData[1];
                            valid = false;
                        }
                    }
                } else {
                    return editGenre(backupData);
                }
                if (valid) {
                    console.log(`\n\tMovie's genre successfully updated!\n${tempData.displayMovieDetails()}`);
                    return editGenre(backupData);
                }
            } while (!valid);
        } else if (choice != genre.length+2) {
            while (true) {
                console.log(`\n\tYou have selected "${genre[choice-1]}" genre`);
                console.log("\t1) Replace\n\t2) Delete\n\t3) Go Back to Main Menu");
                const userInput = readline.question("\t>> ");
                if (userInput == "1") {
                    const genreArr = getgenre(genre);
                    const input = readline.question("\t>> ");
                    if (input.length == 1 && validation(parseInt(input), genreArr.length, 1)) {
                        tempData.genre[choice-1] = genreArr[input-1];
                        console.log(`\n\tGenre replaced successfully!\n${tempData.displayMovieDetails()}`);
                        return editGenre(backupData);
                    } else {
                        console.log("\tPlease enter a valid input!");
                    }
                } else if (userInput == "2") {
                    tempData.genre.splice(choice-1, 1);
                    console.log(`\n\tGenre deleted successfully!\n${tempData.displayMovieDetails()}`);
                    return editGenre(backupData);
                } else if (userInput == "3") {
                    return editGenre(backupData);
                } else {
                    console.log("\tPlease enter a valid input!");
                }
            }
        }
    }
    function editRtime() {
        const Rtime = tempData.runningTime;
        console.log(`\n\tYour current Running Time: "${tempData.runningTime}" in minutes`);
        console.log("\t1) Add new Running Time\n\t2) Go Back to Main Menu");
        const userInput = readline.question("\t>> ");
        if (userInput == "1") {
            while (true) {
                console.log("\n\tPlease enter new Running Time:");
                const newRtime = addMovieRtime();
                if (newRtime != Rtime) {
                    tempData.runningTime = newRtime;
                    console.log(`\n\tRunning Time updated successfully!\n${tempData.displayMovieDetails()}`);
                    return editRtime();
                } else {
                    console.log("\tRunning Time should not be the same as the current Running Time!");
                }
            }
        } else if (userInput != "2") {
            console.log("\tPlease enter a valid input!");
            return editRtime();
        }
    }
    function editRdate() {
        const Rdate = tempData.releaseDate;
        console.log(`\n\tYour current Release Date: "${tempData.releaseDate}"`);
        console.log("\t1) Add new Release Date\n\t2) Go Back to Main Menu");
        const userInput = readline.question("\t>> ");
        if (userInput == "1") {
            while (true) {
                console.log("\n\tPlease enter new Release Date:");
                const newRdate = addMovieRdate();
                if (newRdate != Rdate) {
                    tempData.releaseDate = newRdate;
                    console.log(`\n\tRelease Date updated successfully!\n${tempData.displayMovieDetails()}`);
                    return editRdate();
                } else {
                    console.log("\tRelease Date should not be the same as the current Release Date!");
                }
            }
        } else if (userInput != "2") {
            console.log("\tPlease enter a valid input!");
            return editRdate();
        }
    }
}
// Expression to check if string contains only char between a-z, A-Z & 0-9
var regex = /^[a-zA-Z0-9\s]+$/;
console.log("\nWelcome to Silver Vintage Movie Review Program");
do {
    userName = readline.question("Please enter your name: ");
} while (userName == '' || !(regex.test(userName)));
// Default Values
const movie1 = new Movie("Black Panther: Wakanda Forever 2022", ["Adventure", "Action", "Drama", "Fantasy", "Sci-Fi", "Thriller"], 161, "11 Nov 2022", [9, 42]);
const movie2 = new Movie("Avatar: The Way of Water", ["Adventure", "Sci-Fi"], 192, "16 Dec 2022", [4, 15]);
const movie3 = new Movie("Fast X", ["Crime", "Action", "Mystery", "Thriller"], 43, "19 May 2023", [28, 60]);
const movie4 = new Movie("Ant-Man and the Wasp: Quantumania", ["Adventure", "Action"], 120, "16 Feb 2023", [18, 80]);
const movie5 = new Movie("M3GAN", ["Horror", "Mystery", "Thriller"], 102, "6 Jan 2023", [20, 70]);
// ____________________________________________________________________________________________________________________
var movieList = new Array(movie1, movie2, movie3, movie4, movie5);
do {
    var choice = menu(1, movieList);           // Main menu
    if (choice == 1) {
        movieList.forEach(movie => {
            console.log(`\n${movie.displayMovieDetails()}`);
        });
    } else if (choice == 2) {
        var movieName = addMovieName();
        var genre = addMovieGenre(movieList);
        var Rdate = addMovieRdate();
        var Rtime = addMovieRtime();
        var tempMovie = new Movie(movieName, genre, Rtime, Rdate, [0, 0]);
        movieList.push(tempMovie);
    } else if (choice == 3) {
        updateMovieRating(showMovieList("Select the movie to add a rating:", movieList), movieList);
    } else if (choice == 4) {
		latestDates(movieList);
	} else if (choice == 5) {
        filterByGenre(movieList);
    } else if (choice == 6) {
        do {
			var valid = false;
			console.log("\n\tAdvanced search (-h for help)");
			console.log("\t-e : Exit advanced search");
			const searchString = readline.question("\t>> ");
			const search = searchString.split(" ");
			var Result = [];
			if (search[0] === "-h") {
                displayHelp();
            } else if (search[0].slice(0, 1) != "-") {
                Result.push(nameSearch(searchString, movieList));
                Result.push(genreSearch(searchString, movieList));
                Result.push(releaseDateSearch(searchString, movieList));
                console.log(`\n\tYou search for "${searchString}"!`);
                const temp_Name = Result[0];
                const temp_Genre = Result[1];
                const temp_Rdate = Result[2];
                if (temp_Name.length !== undefined) {
                    console.log(`\n\tMovie with name "${searchString}" found! - [${temp_Name.length}]`);
                    for (let i = 0; i < temp_Name.length; i++) {
                        console.log(`\t${i+1}) ${movieList[temp_Name[i]].name}`);
                    }
                } else {
                    console.log(`\n\tMovie with name "${searchString}" not found!`);
                }
                if (temp_Genre.length !== undefined) {
                    console.log(`\n\tMovie with genre "${searchString}" found! - [${temp_Genre.length}]`);
                    for (let i = 0; i < temp_Genre.length; i++) {
                        console.log(`\t${i+1}) ${movieList[temp_Genre[i]].name}`);
                    }
                } else {
                    console.log(`\n\tMovie with genre "${searchString}" not found!`);
                }
                if (temp_Rdate.length !== undefined) {
                    console.log(`\n\tMovie with release date "${searchString}" found! - [${temp_Rdate.length}]`);
                    for (let i = 0; i < temp_Rdate.length; i++) {
                        console.log(`\t${i+1}) ${movieList[temp_Rdate[i]].name}`);
                    }
                } else {
                    console.log(`\n\tMovie with release date "${searchString}" not found!`);
                }
            } else if (search[0] === "-m") {
                const movieName = searchString.replace("-m ", "");
                Result.push(nameSearch(movieName, movieList));
                const tempName = Result[0];
                console.log(`\n\tYou search for movie name "${movieName}"!`);
                console.log(`\n\tMovie with name "${movieName}" found! - [${tempName.length !== undefined ? tempName.length : 0}]`);
                for (let i = 0; i < tempName.length; i++) {
                    console.log(`\t${i+1}) ${movieList[tempName[i]].name}`);
                }
            } else if (search[0] === "-g") {
                const genre = searchString.replace("-g ", "");
                Result.push(genreSearch(genre, movieList));
                const tempGenre = Result[0];
                console.log(`\n\tYou search for genre "${genre}"!`);
                console.log(`\n\tGenre with name "${genre}" found! - [${tempGenre.length !== undefined ? tempGenre.length : 0}]`);
                for (let i = 0; i < tempGenre.length; i++) {
                    console.log(`\t${i+1}) ${movieList[tempGenre[i]].name}`);
                }
            } else if (search[0] === "-d") {
                const releaseDate = searchString.replace("-d ", "");
                Result.push(releaseDateSearch(releaseDate, movieList));
                const tempRdate = Result[0];
                console.log(`\n\tYou search for release date "${releaseDate}"!`);
                console.log(`\n\tRelease Date with name "${releaseDate}" found! - [${tempRdate.length !== undefined ? tempRdate.length : 0}]`);
                for (let i = 0; i < tempRdate.length; i++) {
                    console.log(`\t${i+1}) ${movieList[tempRdate[i]].name}`);
                }
            } else if (search[0] === "-e") {
                valid = true;
            } else {
                console.log("\tPlease enter a valid input!");
            }            
			function displayHelp() {
				// Display usage instructions
				console.log(
					"\n\t Usage: -m <movie name>, -g <genre>, -r <running time>, -d <release date>, -v <votes>"
				);
				console.log("\n\t\t-m <movie name> \t: Search for a movie by name");
				console.log("\n\t\t-g <genre> \t\t: Search for a movie by genre");
				console.log(
					"\n\t\t-d <release date> \t: Search for a movie by release date"
				);
				console.log("\n\t\t-e \t\t\t: Exit advanced search");
			}
			function nameSearch(userInput, movieList) {
				var indexArr = [];
				const searchName = userInput.replace(" ", "");
				for (var i = 0; i < movieList.length; i++) {
					const movieName = movieList[i].name.replace(" ", "").toLowerCase();
					if (movieName.includes(searchName.toLowerCase())) {
						indexArr.push(i);
					}
				}
				if (indexArr.length == 0) {
					return -1;
				} else {
					return indexArr;
				}
			}
			function genreSearch(userInput, movieList) {
				const inputGenres = userInput.toLowerCase().split(/[ ,]+/);
				// Array to store filtered movies
				const filteredIndex = [];
				// Loop through each movie in the movieList
				for (let i = 0; i < movieList.length; i++) {
					const movie = movieList[i];
					const movieGenres = movie.genre;
					let allGenresMatch = true;
					// Loop through each input genre
					for (let j = 0; j < inputGenres.length; j++) {
						const inputGenre = inputGenres[j];
						let genreMatch = false;
						// Loop through each genre of the current movie
						for (let k = 0; k < movieGenres.length; k++) {
							const genre = movieGenres[k].toLowerCase();
							// Check if the genre includes the input genre
							if (genre.includes(inputGenre)) {
								genreMatch = true;
								break;
							}
						}
						// If no matching genre found, set allGenresMatch to false
						if (!genreMatch) {
							allGenresMatch = false;
							break;
						}
					}
					// If all genres match, add the movie to the filteredIndex array
					if (allGenresMatch) {
						filteredIndex.push(i);
					}
				}
				// If there are filtered movies, print their names
				if (filteredIndex.length != 0) {
					return filteredIndex;
				} else {
					return -1;
				}
			}
			function releaseDateSearch(userInput, movieList) {
				const inputDate = userInput.toLowerCase().split(" ");
				const filteredIndex = [];
				for (let i = 0; i < movieList.length; i++) {
					const movie = movieList[i];
					const movieDate = movie.releaseDate.toLowerCase().split(" ");
					let allDateMatch = true;
					for (let j = 0; j < inputDate.length; j++) {
						const userInputDate = inputDate[j];
						let dateMatch = false;
						for (let k = 0; k < movieDate.length; k++) {
							const date = movieDate[k];
							if (date.includes(userInputDate)) {
								dateMatch = true;
								break;
							}
						}
						if (!dateMatch) {
							allDateMatch = false;
							break;
						}
					}
					if (allDateMatch) {
						filteredIndex.push(i);
					}
				}
				return filteredIndex.length !== 0 ? filteredIndex : -1;
			}
		} while (!valid);
    
    } else if (choice == 7) {
        editMovie(showMovieList("Select the movie to edit:", movieList), movieList);
    } else if (choice == 8) {
        const index = showMovieList("Select the movie to delete:", movieList);
        if (index != 0) {
            console.log(`Movie successfully deleted!\n${movieList[index - 1].displayMovieDetails()}`);
            movieList.splice(index - 1, 1);
        }
    } else if (choice == 9) {
        console.log("Thank you & goodbye!\n");
        exit_program = true;
    } else {
        console.log("Please enter a valid input.");
    }
} while (exit_program == false);