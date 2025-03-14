export const getUserDetails = (req, res) => {
    if (!req.user) {
        return res.status(401).json({ error: "Unauthorized" });
    }

    res.status(200).json({ 
        userId: req.user.studentId || req.user.instituteId,
        email: req.user.email,
        role: req.user.userType,
        abcID: req.user.abcID || null
    });
};