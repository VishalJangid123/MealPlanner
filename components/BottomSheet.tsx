import { View, Text, StyleSheet, SafeAreaView, Pressable, Alert, Modal, } from 'react-native'
import React, { useDebugValue, useEffect, useState } from 'react'
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withSpring,
    runOnJS,
    withTiming,
    SlideInDown,
    SlideOutDown,
    FadeIn,
    FadeOut,
} from "react-native-reanimated";
import { Feather } from '@expo/vector-icons';


export default function BottomSheet({showModal} : Boolean) {
    const [modalVisible, setModalVisible] = useState(false);

    const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

    const toggleSheet = () => {
        console.log("toogle")
        setModalVisible(!modalVisible)
    }

    useEffect(()=> {
        setModalVisible(showModal)

    }, [showModal])
    return (
        <SafeAreaView style={styles.container}>
            {
                modalVisible && (
                    <>
                        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setModalVisible(!modalVisible);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text className='font-semibold text-xl p-5'>Delete meal plan for 24 Nov</Text>
              
              <View className='flex-row gap-5'>
              
              <Pressable
                className='bg-gray-300 rounded-2xl p-5 items-center flex-row gap-2'
                onPress={() => setModalVisible(!modalVisible)}>
                <Feather name="x" size={18} />
                {/* <Text style={styles.textStyle}></Text> */}
              </Pressable>

              <Pressable className='bg-red-500 rounded-2xl p-5 items-center flex-row gap-2'
                onPress={() => setModalVisible(!modalVisible)}>
                 <Feather name="trash" size={18} /> 
                {/* <Text style={styles.textStyle}>
                    Delete
                </Text> */}
              </Pressable>

             
              </View>


            </View>
          </View>
        </Modal>
        <Pressable
          style={[styles.button, styles.buttonOpen]}
          onPress={() => setModalVisible(true)}>
          <Text style={styles.textStyle}>Show Modal</Text>
        </Pressable>


                    </>
                )


            }
        </SafeAreaView>

    )
}
const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalView: {
      margin: 20,
      backgroundColor: 'white',
      borderRadius: 20,
      padding: 35,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    button: {
      borderRadius: 20,
      padding: 10,
      elevation: 2,
    },
    buttonOpen: {
      backgroundColor: '#F194FF',
    },
    buttonClose: {
      backgroundColor: '#2196F3',
    },
    textStyle: {
      color: 'white',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    modalText: {
      marginBottom: 15,
      textAlign: 'center',
    },
  });