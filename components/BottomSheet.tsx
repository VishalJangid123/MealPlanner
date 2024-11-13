import { View, Text, StyleSheet, SafeAreaView, Pressable, Alert, Modal, } from 'react-native'
import React, { useDebugValue, useEffect, useState } from 'react'
import { Feather } from '@expo/vector-icons';

export default function BottomSheet({ showModal, setShowModel, dateToDelete, deleteCall }: any) {
  useEffect(() => {
    console.log("Bottom", showModal)
    console.log(dateToDelete)
  }, [showModal])
  return (
    <SafeAreaView>
      {
        showModal && (
          <>
            <Modal
              animationType="slide"
              transparent={true}
              visible={showModal}
              onRequestClose={() => {
                Alert.alert('Modal has been closed.');
                setShowModel(!showModal);
              }}>
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <Text className='font-semibold text-xl p-5'>Delete meal plan for {dateToDelete}</Text>

                  <View className='flex-row gap-5'>

                    <Pressable
                      className='bg-gray-300 rounded-2xl p-5 items-center flex-row gap-2'
                      onPress={() => setShowModel(!showModal)}>
                      <Feather name="x" size={18} />
                    </Pressable>

                    <Pressable className='bg-red-500 rounded-2xl p-5 items-center flex-row gap-2'
                      onPress={() => deleteCall()}>
                      <Feather name="trash" size={18} />
                    </Pressable>
                  </View>
                </View>
              </View>
            </Modal>

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