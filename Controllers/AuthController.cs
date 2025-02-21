using Microsoft.AspNetCore.Mvc;

namespace RealEstate.Controllers
{
  public class AuthController : Controller
  {
    public IActionResult Index()
    {
      return View();
    }
  }
}
