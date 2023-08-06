module.exports = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json('Incorrect form submission');
  }

  try {
    const data = await db
      .select('email', 'hash')
      .from('login')
      .where('email', '=', email);
    if (data.length === 0) {
      return res.status(400).json('Wrong credentials');
    }

    const isValid = bcrypt.compareSync(password, data[0].hash);
    if (isValid) {
      const [user] = await db
        .select('*')
        .from('users')
        .where('email', '=', email);
      if (!user) {
        return res.status(400).json('Unable to get user');
      }
      res.json(user);
    } else {
      res.status(400).json('Wrong credentials');
    }
  } catch (err) {
    console.error(err);
    res.status(400).json('Wrong credentials');
  }
};
