export const timeAgo = (date: Date): string => {
  const seconds: number = Math.floor(
    (new Date().getTime() - date.getTime()) / 1000
  );

  let interval: number = Math.floor(seconds / 31536000);

  if (interval > 1) {
    return interval + " years ago";
  }
  interval = Math.floor(seconds / 2592000);
  if (interval > 1) {
    return interval + " months ago";
  }
  interval = Math.floor(seconds / 86400);
  if (interval > 1) {
    return interval + " days ago";
  }
  interval = Math.floor(seconds / 3600);
  if (interval > 1) {
    return interval + " hours ago";
  }
  interval = Math.floor(seconds / 60);
  if (interval > 1) {
    return interval + " minutes ago";
  }
  return Math.floor(seconds) + " seconds ago";
};

export const formatDate = (date: Date) => {
  if (!date) {
    return date;
  }

  const year = date.getUTCFullYear();
  const month = date.getUTCMonth();
  const day = date.getUTCDate();

  return `${year}-${month + 1 > 9 ? "" : 0}${month + 1}-${
    day > 9 ? "" : 0
  }${day}`;
};
