import React, { useState, useEffect } from "react";
import type { ActionFunction, V2_MetaFunction } from "@remix-run/node";
import { authenticator } from "~/utils/auth.server";
import { Form, useLoaderData, useActionData } from "@remix-run/react";
import { LoaderFunction } from "@remix-run/node";
import MenuIcon from "@mui/icons-material/Menu";
import { addCity, getAllCitiesByUser, deleteCity } from "~/utils/city.server";
import { Cityform } from "~/components/cityform";
import { Citylist } from "~/components/cityList";
import { Box } from "@mui/material";
import { FlexBetween } from "~/components/flexBetween";
import { LandingLayout } from "~/components/landingLayout";
import { Typography } from "@mui/material";
import { ListView } from "~/components/listView";
import { LogoutButton } from "~/components/Button";
import { CityWeatherLayout } from "~/components/layout";
import { WeatherModal, ExceedExceptionModal } from "~/Modal";
export const meta: V2_MetaFunction = () => {
  return [{ title: " Remix Weather App" }];
};

export const loader: LoaderFunction = async ({ request }) => {
  const user = await authenticator.isAuthenticated(request, {
    failureRedirect: "/login",
  });
  const userWithCities = await getAllCitiesByUser(user.id);
  const apiKey = process.env.API_KEY;
  const citiesWeatherurls: string[] | undefined = userWithCities?.city.map(
    (city) =>
      `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city.city.toLowerCase()}&aqi=yes`
  );
  const fetchCityUrls = async (urls: string[]) => {
    const allCityUrlPromises = urls.map(async (url) => {
      try {
        const res = await fetch(url);
        return await res.json();
      } catch (error) {
        console.log({ msg: error });
        return;
      }
    });
    return Promise.all(allCityUrlPromises);
  };
  const ciitesWeatherList = await fetchCityUrls(citiesWeatherurls ?? []);

  return { user, userWithCities, ciitesWeatherList };
};

export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData();
  const action = form.get("action");

  switch (action) {
    case "logout": {
      return await authenticator.logout(request, { redirectTo: "/login" });
    }
    case "new city": {
      const City = form.get("city");
      if (!City) {
        return { emptyCity: "Please enter city" };
      }
      const user = await authenticator.isAuthenticated(request);
      const newCity = await addCity({
        userId: user.id,
        city: City,
        postedBy: {
          connect: {
            id: user.id,
          },
        },
      });
      return newCity;
    }
    case "delete": {
      const id = form.get("id") as string;
      const deletedCity = await deleteCity(id);
      return deletedCity;
    }
    default:
      return null;
  }
};

export default function Index() {
  const { user, userWithCities, ciitesWeatherList } =
    useLoaderData<typeof loader>();

  const data = useActionData<typeof action>();
  const [showDetails, setShowDetails] = useState(false);
  const [exception, setException] = useState(false);
  const [cityWeatherInfo, setCityWeatherInfo] = useState<null | object>({});
  const handleClose = () => {
    setShowDetails(false);
  };
  const exceptionClose = () => {
    setException(false);
  };
  useEffect(() => {
    if (data?.exception) {
      setException(true);
    }
  }, [data?.exception, data]);

  return (
    <LandingLayout>
      <FlexBetween>
        <Typography
          variant="h5"
          padding="5px"
          fontWeight="bold"
          textAlign="center">
          <MenuIcon fontSize="small" sx={{ marginRight: 2, marginLeft: 0 }} />
          Welcome to the weather app ipgautomotive
        </Typography>
        <Form method="post">
          <LogoutButton type="submit" name="action" value="logout">
            Logout
          </LogoutButton>
        </Form>
      </FlexBetween>

      <Box sx={{ position: "relative", padding: "0.7rem" }}>
        <Typography color="info" fontWeight="bold">
          Hi {user.name}, Can add your favorite cities to check for it's weather
          details
        </Typography>
        <Cityform />
        <Typography color="red">{data && data.emptyCity}</Typography>
        <br />
        <CityWeatherLayout>
          <Box width="100%">
            <Typography fontWeight="600" fontSize="20px">
              {userWithCities?.city.length !== 0 && "Favorite Cites"}
            </Typography>
            {userWithCities?.city?.map((city: any, i: number) => {
              return (
                <ListView key={city.id}>
                  <Citylist
                    id={city.id}
                    city={city.city}
                    setCityWeatherInfo={setCityWeatherInfo}
                    setShowDetails={setShowDetails}
                    ciitesWeatherList={ciitesWeatherList}
                    cityWeather={ciitesWeatherList[i]}
                  />
                </ListView>
              );
            })}
          </Box>
        </CityWeatherLayout>
        {showDetails && (
          <WeatherModal
            showDetails={showDetails}
            handleClose={handleClose}
            cityWeatherInfo={cityWeatherInfo}
          />
        )}

        {/* </div>
      </div> */}
      </Box>
      {exception && (
        <ExceedExceptionModal
          exception={exception}
          exceptionClose={exceptionClose}
          data={data.msg}
        />
      )}
    </LandingLayout>
  );
}
