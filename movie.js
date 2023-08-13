// Class
class Movie {
    constructor(name, genre, runningTime, releaseDate, rating) {
        this.name = name;
        this.genre = genre;
        this.runningTime = runningTime;
        this.releaseDate = releaseDate;
        this.rating = rating;
    }

    displayMovieDetails() {
        const hour = Math.floor(this.runningTime / 60);
        const minute = this.runningTime % 60;

        const totalVote = this.rating[0];
        const rating = this.rating[1];
        const average = rating / totalVote;

        const outputName = `Name\t\t: ${this.name}`;
        const outputGenre = `Genre\t\t: ${this.genre}`;
        const outputRunningTime = `Running Time\t: ${hour !== 0 && minute !== 0 ? `${hour}h ${minute}m` : hour === 0 ? `${minute}m` : `${hour}h`}`;
        const outputReleaseDate = `Release Date\t: ${this.releaseDate}`;
        const outputRating = `Rating\t\t: ${this.rating[0] !== 0 && this.rating[1] !== 0 ? average.toFixed(1) : 0} (${totalVote} voters)`;

        const output = `${outputName}\n${outputGenre}\n${outputRunningTime}\n${outputReleaseDate}\n${outputRating}`;
        return output;
    }
}
module.exports = Movie;