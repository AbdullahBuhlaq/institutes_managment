function checkShow(userInformation, shows, brnachShows, branch) {
  let showStatus = true;

  shows.map((show) => {
    showStatus = showStatus || userInformation.show.includes(show);
  });
  brnachShows.map((show) => {
    showStatus = showStatus || (userInformation.show.includes(show) && userInformation.branch == branch);
  });
  console.log(showStatus);

  return showStatus;
}

export default checkShow;
