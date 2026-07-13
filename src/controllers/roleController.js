const getallrole = async (req, res) => {
  try {
    const roles = [
      {
        roleId: "1",
        roleName: "Admin"
      },
      {
        roleId: "2",
        roleName: "User"
      },
      {
        roleId: "3",
        roleName: "Technician"
      }
    ];

    return res.status(200).json({
      success: true,
      data: roles
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
  getallrole,
};