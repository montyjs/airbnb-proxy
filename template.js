const template = (str1 = '<div>So, I herd you liek mudkipz</div>', str2 = '<div>Im a smelly buttface</div>', str3 = '<div>Im a dirty pooface</div>', str4 = '<div>I like turtles</div>') => {
  return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="shortcut icon" type="image/png" href="https://a0.muscache.com/airbnb/static/logotype_favicon-21cc8e6c6a2cca43f061d2dcabdf6e58.ico"/>
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
        <title>AirBnB Clone</title>
      </head>
      <body>
        ${str1}
        ${str2}
        ${str3}
        ${str4}
      </body>
    </html>
    `;
};

module.exports = template;