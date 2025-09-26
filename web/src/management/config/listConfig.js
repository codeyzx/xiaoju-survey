export const type = {
  normal: 'surveyList.surveyTypes.normal',
  vote: 'surveyList.surveyTypes.vote',
  nps: 'surveyList.surveyTypes.nps',
  register: 'surveyList.surveyTypes.register'
}

export const spaceListConfig = {
  name: {
    title: 'surveyList.spaceName',
    key: 'name',
    width: 200
  },
  surveyTotal: {
    title: 'surveyList.surveyCount',
    key: 'surveyTotal',
    width: 150,
    tip: true
  },
  memberTotal: {
    title: 'surveyList.memberCount',
    key: 'memberTotal',
    width: 150
  },
  owner: {
    title: 'surveyList.owner',
    key: 'owner',
    width: 150
  },
  createdAt: {
    title: 'surveyList.createdAt',
    key: 'createdAt',
    minWidth: 200
  }
}

export const groupListConfig = {
  name: {
    title: 'surveyList.groupName',
    key: 'name',
    width: 200
  },
  surveyTotal: {
    title: 'surveyList.surveyCount',
    key: 'surveyTotal',
    width: 150,
    tip: true
  },
  createdAt: {
    title: 'surveyList.createdAt',
    key: 'createdAt',
    minWidth: 200
  }
}

export const fieldConfig = {
  type: {
    title: 'surveyList.surveyType',
    key: 'type',
    width: 150,
    comp: 'TagModule'
  },
  title: {
    title: 'surveyList.surveyTitle',
    key: 'title',
    width: 240,
    tip: true
  },
  remark: {
    title: 'surveyList.remark',
    key: 'remark',
    width: 200,
    tip: true
  },
  state: {
    title: 'surveyList.state',
    key: 'state',
    width: 140,
    comp: 'StateModule'
  },
  owner: {
    title: 'surveyList.owner',
    key: 'owner',
    width: 140
  },
  updatedAt: {
    title: 'surveyList.updatedAt',
    key: 'updatedAt',
    minWidth: 200
  },
  createdAt: {
    title: 'surveyList.createdAt',
    key: 'createdAt',
    minWidth: 200
  }
}

export const recycleBinFieldConfig = {
  title: {
    title: 'surveyList.surveyTitle',
    key: 'title',
    width: 240,
    tip: true
  },
  createdAt: {
    title: 'surveyList.createdAt',
    key: 'createdAt',
    minWidth: 200
  },
  deletedAt: {
    title: 'surveyList.deletedAt',
    key: 'deletedAt',
    minWidth: 200
  },
  owner: {
    title: 'surveyList.owner',
    key: 'owner',
    width: 140
  }
}

export const noListDataConfig = {
  title: 'surveyList.emptyStates.noSurveys',
  desc: 'surveyList.emptyStates.noSurveysDesc',
  img: '/imgs/icons/list-empty.webp'
}

export const noSpaceDataConfig = {
  title: 'surveyList.emptyStates.noSpaces',
  desc: 'surveyList.emptyStates.noSpacesDesc',
  img: '/imgs/icons/list-empty.webp'
}
export const noSpaceSearchDataConfig = {
  title: 'surveyList.emptyStates.noSpacesSearch',
  desc: 'surveyList.emptyStates.noSpacesSearchDesc',
  img: '/imgs/icons/list-empty.webp'
}
export const noGroupDataConfig = {
  title: 'surveyList.emptyStates.noGroups',
  desc: 'surveyList.emptyStates.noGroupsDesc',
  img: '/imgs/icons/list-empty.webp'
}
export const noGroupSearchDataConfig = {
  title: 'surveyList.emptyStates.noGroupsSearch',
  desc: 'surveyList.emptyStates.noGroupsSearchDesc',
  img: '/imgs/icons/list-empty.webp'
}
export const noSearchDataConfig = {
  title: 'surveyList.emptyStates.noSurveysSearch',
  desc: 'surveyList.emptyStates.noSurveysSearchDesc',
  img: '/imgs/icons/list-empty.webp'
}
export const noDownloadTaskConfig = {
  title: 'surveyList.emptyStates.noDownloadTasks',
  desc: 'surveyList.emptyStates.noDownloadTasksDesc',
  img: '/imgs/icons/list-empty.webp'
}

export const curStatus = {
  new: {
    value: 'new',
    label: 'surveyList.surveyStatuses.new'
  },
  published: {
    value: 'published',
    label: 'surveyList.surveyStatuses.published'
  },
  editing: {
    label: 'surveyList.surveyStatuses.editing',
    value: 'editing'
  }
}

// 子状态
export const subStatus = {
  pausing: {
    label: 'surveyList.surveyStatuses.pausing',
    value: 'pausing'
  }
}

export const statusMaps = {
  ...Object.fromEntries(Object.keys(curStatus).map((key) => [key, curStatus[key].label])),
  ...Object.fromEntries(Object.keys(subStatus).map((key) => [key, subStatus[key].label]))
}

export const curStatusKey = 'curStatus.status'
export const subStatusKey = 'subStatus.status'

// 问卷类型
export const surveyTypeSelect = {
  label: 'surveyList.filters.surveyType',
  value: [
    {
      value: '',
      label: 'surveyList.filters.allTypes'
    },
    {
      value: 'normal',
      label: 'surveyList.surveyTypes.normal'
    },
    // {
    //   value: 'exam',
    //   label: '在线考试'
    // },
    // {
    //   value: 'nps',
    //   label: 'NPS评分'
    // },
    {
      value: 'vote',
      label: 'surveyList.surveyTypes.vote'
    },
    {
      value: 'register',
      label: 'surveyList.surveyTypes.register'
    }
  ],
  default: ''
}

// 问卷状态
export const curStatusSelect = {
  label: 'surveyList.filters.status',
  value: [
    {
      value: '',
      label: 'surveyList.filters.allStatuses'
    },
    curStatus.new,
    curStatus.published,
    curStatus.editing,
    subStatus.pausing
  ],
  default: ''
}

export const selectOptionsDict = Object.freeze({
  surveyType: surveyTypeSelect,
  status: curStatusSelect
})

export const buttonOptionsDict = Object.freeze({
  updatedAt: {
    label: 'surveyList.sortOptions.updatedAt',
    icons: [
      {
        name: 'el-icon-sort',
        effectValue: '',
        isDefaultValue: true,
        icon: 'sort'
      },
      {
        name: 'el-icon-sort-up',
        effectValue: 1,
        icon: 'sort-up'
      },
      {
        name: 'el-icon-sort-down',
        effectValue: -1,
        icon: 'sort-down'
      }
    ]
  },
  createdAt: {
    label: 'surveyList.sortOptions.createdAt',
    icons: [
      {
        name: 'el-icon-sort',
        effectValue: '',
        icon: 'sort'
      },
      {
        name: 'el-icon-sort-up',
        effectValue: 1,
        icon: 'sort-up'
      },
      {
        name: 'el-icon-sort-down',
        effectValue: -1,
        isDefaultValue: true,
        icon: 'sort-down'
      }
    ]
  }
})
