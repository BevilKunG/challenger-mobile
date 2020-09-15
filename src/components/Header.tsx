import { faPlus, faEdit, faBan } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import React, { FC } from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import normalize from 'react-native-normalize'

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: normalize(22),
    paddingVertical: normalize(16),
  },
  headerBrand: {
    flex: 4,
    fontSize: 24,
    fontWeight: '700',
  },
  headerMenu: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
})

interface IHeaderProps {
  onAddPress: any
  onEditPress: any
  onCancelEditPress: any
  editMode: boolean
}

export const Header: FC<IHeaderProps> = ({
  onAddPress,
  onEditPress,
  onCancelEditPress,
  editMode,
}) => {
  return (
    <View style={[styles.container]}>
      <Text style={[styles.headerBrand]}>Challenger</Text>
      <View style={[styles.headerMenu]}>
        {!editMode ? (
          <TouchableOpacity onPress={onAddPress}>
            <FontAwesomeIcon icon={faPlus} size={18} />
          </TouchableOpacity>
        ) : (
          <FontAwesomeIcon icon={faPlus} size={18} color="#d3d3d3" />
        )}

        {!editMode ? (
          <TouchableOpacity onPress={onEditPress}>
            <FontAwesomeIcon icon={faEdit} size={18} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={onCancelEditPress}>
            <FontAwesomeIcon icon={faBan} size={18} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  )
}
