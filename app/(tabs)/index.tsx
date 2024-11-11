import { Text, View, Image, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';

import moment from 'moment';
import { useEffect, useState } from 'react';
import { useNavigation, useRouter } from 'expo-router';
import axios from 'axios';
import MenuCard from '@/components/MenuCard';


export default function HomeScreen() {
  const currentDate = moment();
  const startOfWeek = currentDate.clone().startOf('week');
  const [date, setDate] = useState("");
  const [nextDate, setNextDate] = useState("");
  const [selectedDate, setSelectedDate] = useState("")
  const navigation = useNavigation();
  const router = useRouter();
  const [ menuData, setMenuData] = useState([]);

  const fetchAllMenuData = async () => {
    console.log("fetch called")
    try
    {
      const response  = await axios.get("http://localhost:3000/menu/all");
      setMenuData(response.data);
      console.log(response.data)
    }
    catch(error)
    {
      console.log("Error",error)
    }
  }

  // useEffect(() => {
  //   fetchAllMenuData();
  // }, [])

  const renderWeeksDates = (startOfweek: any) => {
    let weekDates = [];
    for (let i = 0; i < 7; i++) {
      const date = startOfweek.clone().add(i, 'days');
      const formattedDate = date.format("ddd DD");
      const isCurrentDate = date.isSame(currentDate, 'days')

      const menuForDate = menuData.find((menu) => menu.date == formattedDate)

      weekDates.push(
        <MenuCard date={date} menuForDate={menuForDate} isCurrentDate={isCurrentDate} />
      )
    }
    return weekDates;
  }

  const renderWeeks = (numWeeks: any) => {
    let weeks = [];
    for (let i = 0; i < numWeeks; i++) {
      let te =
        weeks.push(
          <View>
            <Text>
              {startOfWeek.clone().add(i * 7, "days").format("DD MMM")}
            </Text>
            <Text>{renderWeeksDates(startOfWeek.clone().add(i * 7, "days"))}</Text>
          </View>
        )
    }
    return weeks;
  }


  return (
    <SafeAreaView>
      <ScrollView>
        <View className="flex p-5">
          {renderWeeks(3)}
        </View>

      </ScrollView>

    </SafeAreaView>
  );
}