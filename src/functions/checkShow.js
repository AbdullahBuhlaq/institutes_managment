function checkShow(userInformation, shows, brnachShows, branch) {
  let showStatus = false;

  shows.map((show) => {
    showStatus = showStatus || userInformation.show.includes(show);
  });
  brnachShows.map((show) => {
    showStatus = showStatus || (userInformation.show.includes(show) && userInformation.branch == branch);
  });
  return showStatus;
}

export default checkShow;
