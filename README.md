# NEMONEMO

Pick the Today's color based on your mood!

![nemonemo](https://user-images.githubusercontent.com/21287797/169677807-15dbcad5-3afd-4521-91ae-225728d3a3d4.gif)


[More Detail](https://miniredpanda.notion.site/NEMONEMO-8a044fd3b86b43ddac1da8bd25e2c9b0)

## Tech Stack

- Next.js
- PlanetScale
- Prisma
- TailwindCSS
- react-color

## Setup

```bash
$ cd nemonemo/
$ code .env

# Add your PlanetScale DB URL

$ npm install
$ npm run dev

# http://localhost:3000
```

### DB command

```bash
# connect DB
$ pscale connect nemonemo-db

# admin pannel
$ npx prisma studio

# add Prisma Client
$ npx prisma generate

# update DB(pscale) & update prisma client
$ npx prisma db push

```

## License

[MIT](https://choosealicense.com/licenses/mit/)
