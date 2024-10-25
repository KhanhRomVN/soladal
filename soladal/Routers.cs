using System;
using Microsoft.UI.Xaml.Controls;

namespace soladal
{
    public static class Router
    {
        public static void NavigateToHome(Frame frame)
        {
            frame.Navigate(typeof(HomePage));
        }

        public static void NavigateToLogin(Frame frame)
        {
            frame.Navigate(typeof(LoginPage));
        }

        public static void NavigateToRegister(Frame frame)
        {
            frame.Navigate(typeof(RegisterPage));
        }

        internal static void NavigateToHome(object mainFrame)
        {
            throw new NotImplementedException();
        }
    }
}