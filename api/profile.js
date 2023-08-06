module.exports = async (req, res) => {
  const { id } = req.query;
  try {
    const user = await db.select('*').from('users').where({ id });
    if (user.length) {
      res.json(user[0]);
    } else {
      res.status(400).json('Not found');
    }
  } catch (err) {
    res.status(400).json('Error getting user');
  }
};
