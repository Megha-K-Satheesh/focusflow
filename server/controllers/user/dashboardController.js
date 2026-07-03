import asyncHandler from "../../middleware/asyncHandler.js";
import DashboardService from "../../services/user/dashboardService.js";
import ResponseHandler from "../../utils/responseHandler.js";

class DashboardController {
  static getDashboard = asyncHandler(
    async (req, res) => {
      const result =
        await DashboardService.getDashboard(
          req.user.id
        );

      return ResponseHandler.success(
        res,
        "Dashboard fetched successfully",
        result
      );
    }
  );
}

export default DashboardController;
