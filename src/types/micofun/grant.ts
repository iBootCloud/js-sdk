import { IBC } from '@ibootcloud/common-lib';

export namespace Grant {
  export interface GrantGroup {
    groupId?: string;
    groupName?: string;
    description?: string;
  }

  export interface GrantGroupPolicyRel {
    groupId: string;
    policyId: string;
  }

  export interface GrantGroupRoleRel {
    groupId: string;
    roleId: string;
  }

  export interface GrantGroupSubjectRel {
    groupId: string;
    subjectId: string;
  }

  export interface GrantSubject {
    subjectId?: string;
    subjectName?: string;
    description?: string;
  }

  export interface GrantSubjectPolicyRel {
    subjectId: string;
    policyId: string;
  }

  export interface GrantSubjectRoleRel {
    subjectId: string;
    roleId: string;
  }

  export interface GrantRole {
    roleId?: string;
    roleName?: string;
    description?: string;
  }

  export interface GrantRolePolicyRel {
    roleId: string;
    policyId: string;
  }

  export enum GrantPolicyEffect {
    ALLOW = 1,
    DENY = 2,
  }

  export interface GrantPolicy {
    policyId?: string;
    policyName?: string;
    effect?: GrantPolicyEffect;
    resource?: string;
    action?: string;
    description?: string;
    timeRangeStart?: Date;
    timeRangeEnd?: Date;
  }

  export enum GrantEntityType {
    SUBJECT = 1,
    GROUP = 2,
    ROLE = 3,
    POLICY = 4,
  }

  export type GrantEntityRel =
    | GrantRolePolicyRel
    | GrantSubjectPolicyRel
    | GrantSubjectRoleRel
    | GrantGroupPolicyRel
    | GrantGroupRoleRel
    | GrantGroupSubjectRel;

  export interface GrantEntityUpdateAffected {
    policy: number;
    role: number;
    subject: number;
    group: number;
  }

  export interface GrantEntityBinding {
    policyId?: string[];
    roleId?: string[];
    subjectId?: string[];
    groupId?: string[];
  }

  export interface GrantEntityBindingAttr {
    bind: GrantEntityBinding;
  }

  export interface RemoveGrantEntityResponse {
    affected: GrantEntityUpdateAffected;
  }

  export interface BindRelBody {
    entityType: GrantEntityType;
    entityId: string[];
    targetType: GrantEntityType;
    targetId: string[];
  }

  export interface UnBindRelBody {
    entityType: GrantEntityType;
    entityId: string[];
    targetType?: GrantEntityType;
    targetId?: string[];
  }

  export interface UnBindRelResponse {
    affected: GrantEntityUpdateAffected | number;
  }

  export interface GetBindingRelParam {
    entityType: GrantEntityType;
    entityId: string;
    targetTypes?: GrantEntityType[];
  }

  export interface RemovePolicyBody {
    policyId?: string[];
    policyName?: string[];
  }

  export interface ListPolicyParam {
    policyId?: string[];
    policyName?: string[];
    query?: string;
    effect?: GrantPolicyEffect[];
  }

  export interface ListPolicyResponse {
    page: IBC.Page<GrantPolicy & GrantEntityBindingAttr>;
  }

  export interface RemoveRoleBody {
    roleId?: string[];
    roleName?: string[];
  }

  export interface ListRoleParam {
    roleId?: string[];
    roleName?: string[];
    query?: string;
  }

  export interface ListRoleResponse {
    page: IBC.Page<GrantRole & GrantEntityBindingAttr>;
  }

  export interface RemoveSubjectBody {
    subjectId?: string[];
    subjectName?: string[];
  }

  export interface ListSubjectParam {
    subjectId?: string[];
    subjectName?: string[];
    query?: string;
  }

  export interface ListSubjectResponse {
    page: IBC.Page<GrantSubject & GrantEntityBindingAttr>;
  }

  export interface RemoveGroupBody {
    groupId?: string[];
    groupName?: string[];
  }

  export interface ListGroupParam {
    groupId?: string[];
    groupName?: string[];
    query?: string;
  }

  export interface ListGroupResponse {
    page: IBC.Page<GrantGroup & GrantEntityBindingAttr>;
  }

  export interface ChallengeParam {
    conflictEffect: GrantPolicyEffect;
    defaultEffect: GrantPolicyEffect;
    subjectId?: string;
    subjectName?: string;
    action: string;
    resource: string[];
  }

  export interface ChallengeResponse {
    effect: GrantPolicyEffect[];
  }
}
